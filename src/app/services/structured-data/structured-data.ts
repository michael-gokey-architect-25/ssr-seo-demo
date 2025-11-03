// src/app/services/structured-data.service.ts
/**
 * Structured Data Service
 * Manages JSON-LD structured data for rich search results.
 * TEACHING POINT: What is JSON-LD?
 * JSON-LD = JavaScript Object Notation for Linked Data
 * It's a way to add semantic markup to web pages that helps
 * search engines understand your content's meaning and context.
 * Without structured data:
 * 	Search engine sees: "John Doe is a Software Engineer"
 * 	Search engine thinks: "This is text"
 * With structured data:
 * 	Search engine sees: Person schema with name and jobTitle properties
 * 	Search engine thinks: "This is a person named John Doe who works  as a Software Engineer"
 * Benefits:
 * - Rich snippets in search results (images, ratings, prices, etc.)
 * - Knowledge graph eligibility (info boxes in Google)
 * - Better click-through rates (enhanced search appearance)
 * - Voice search optimization
 * - Semantic understanding of content relationships
 * Format:
 * Structured data is added as <script type="application/ld+json">
 * in the document <head>.
 * Example:
 * <script type="application/ld+json">
 * {
 *   "@context": "https://schema.org/",
 *   "@type": "Person",
 *   "name": "John Doe",
 *   "jobTitle": "Software Engineer"
 * }
 * </script>
 * 
 * Testing:
 * - Google Rich Results Test: https://search.google.com/test/rich-results
 * - Schema.org Validator: https://validator.schema.org/
 * Schema Types:
 * Over 700 types at schema.org including:
 * - Person (user profiles)
 * - Organization (company info)
 * - Product (e-commerce)
 * - Article (blog posts)
 * - Event (conferences, concerts)
 * - Recipe (food blogs)
 * - Review (ratings)
 * - And many more!
 * @see https://schema.org for complete schema documentation
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  StructuredData,
  PersonSchema,
  OrganizationSchema,
  WebSiteSchema,
  BreadcrumbListSchema
} from '../../models/structured-data';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  /**
   * TEACHING: Server-Safe Document Access
   * Always use DOCUMENT injection token for SSR compatibility.
   * Never use global 'document' object!
   */
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Adds structured data to the document head.
   * TEACHING: How It Works
   * 1. Creates a <script> element
   * 2. Sets type="application/ld+json" (tells browsers/search engines it's JSON-LD)
   * 3. Serializes data object to JSON string
   * 4. Assigns unique ID for later removal
   * 5. Removes any existing script with same ID (prevents duplicates)
   * 6. Appends to document <head>
   * Search engines like Google scan the <head> for these scripts
   * and parse the JSON-LD to understand page content.
   * @param data - Structured data object (must have @context and @type)
   * @param id - Unique identifier for this schema (for removal/updates)
   * @example
   * ```typescript
   * this.structuredDataService.addStructuredData({
   *   '@context': 'https://schema.org/',
   *   '@type': 'Person',
   *   'name': 'John Doe',
   *   'jobTitle': 'Software Engineer'
   * }, 'user-profile-123');
   * ```
   */
  addStructuredData(data: StructuredData, id: string): void {
    /**
     * TEACHING: Why Remove Before Adding?
     * If user navigates away and back, or if component re-initializes,
     * we don't want duplicate scripts.
     * Always clean up before adding new structured data.
     */
    this.removeStructuredData(id);

    /**
     * TEACHING: Creating DOM Elements
     * this.document.createElement() works on both server and browser.
     * We create a script element to hold our JSON-LD data.
     */
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    
    /**
     * TEACHING: JSON.stringify()
     * Converts JavaScript object to JSON string.
     * Search engines parse this JSON to understand content.
     * null, 2 parameters add pretty-printing (2-space indent)
     * Makes HTML source more readable for debugging.
     */
    script.textContent = JSON.stringify(data, null, 2);
    
    /**
     * TEACHING: Unique IDs
     * We prefix with 'structured-data-' to avoid ID conflicts
     * with other elements on the page.
     */
    script.id = this.getScriptId(id);
    
    /**
     * TEACHING: Appending to Head
     * Structured data must be in <head> for search engines to find it.
     * Google's crawler specifically looks in <head> section.
     */
    this.document.head.appendChild(script);
  }


  /**
   * Removes structured data script from the document.
   * TEACHING: Cleanup in Components
   * Good practice to call this in ngOnDestroy():
   * ```typescript
   * ngOnDestroy() {
   *   this.structuredDataService.removeStructuredData('my-schema-id');
   * }
   * ```
   * This prevents stale structured data from lingering when
   * navigating between routes.
   * @param id - The unique identifier used when adding the schema
   */
  removeStructuredData(id: string): void {
    const scriptId = this.getScriptId(id);
    const existingScript = this.document.getElementById(scriptId);
    
    if (existingScript) {
      existingScript.remove();
    }
  }


  /**
   * Creates Person schema for user profiles.
   * TEACHING: Person Schema Use Cases
   * Perfect for:
   * - User profile pages
   * - Author bio pages
   * - Team member pages
   * - Contact pages
   * - About the founder pages
   * Rich Results:
   * Google may show:
   * - Profile photo
   * - Job title
   * - Organization
   * - Contact info
   * - Social media links
   * Example in Google Search:
   * 	[Photo] John Doe
   * 	Software Engineer at ABC Corp
   * 	john@example.com | San Francisco, CA
   * Schema.org reference: https://schema.org/Person
   * @param user - User object with profile information
   * @returns PersonSchema object
   * @example
   * ```typescript
   * const schema = this.structuredDataService.createPersonSchema(user);
   * this.structuredDataService.addStructuredData(schema, `user-${user.id}`);
   * ```
   */
  createPersonSchema(user: User): PersonSchema {
    /**
     * TEACHING: Building Schema Objects
     * Start with required fields:
     * - @context: Always "https://schema.org/" for Schema.org types
     * - @type: "Person" for individuals
     * - name: Full name (required)
     * Then add optional fields based on available data.
     */
    const schema: PersonSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Person',
      name: user.name
    };


    /**
     * TEACHING: Conditional Properties
     * Only add properties if data exists.
     * Don't add empty strings or undefined values.
     * Search engines ignore empty/invalid fields, but cleaner to not include them at all.
     */

    // Job title (appears prominently in rich results)
    if (user.jobTitle) {
      schema.jobTitle = user.jobTitle;
    }

    // Email (enables "Email" action in some search results)
    if (user.email) {
      schema.email = user.email;
    }

    // Phone (enables "Call" action in mobile results)
    if (user.phone) {
      schema.telephone = user.phone;
    }


    /**
     * TEACHING: Image URLs for Schema
     * Profile images should be:
     * - Square (1:1 aspect ratio)
     * - Minimum 112x112px
     * - Absolute URLs (https://...)
     * - High quality
     * We use Unsplash for demo purposes.
     * In production, use user's actual profile photo.
     */
    if (user.avatar) {
      schema.image = user.avatar;
    }

    // Personal website or profile URL
    if (user.website) {
      schema.url = user.website;
    }


    /**
     * TEACHING: Nested Schema Types
     * PostalAddress is itself a schema type.
     * It must have its own @type property.
     * This creates a relationship:
     * Person -> has address -> PostalAddress
     */
    if (user.address) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: user.address.street,
        addressLocality: user.address.city,
        postalCode: user.address.zipcode
      };
    }


    /**
     * TEACHING: Organization Relationship
     * worksFor creates a connection between Person and Organization.
     * Can be:
     * - Simple string: "ABC Corporation"
     * - Full Organization schema with nested properties
     * We use simple string for this demo.
     */
    if (user.company) {
      schema.worksFor = user.company.name;
    }

    return schema;
  }

  /**
   * Creates Organization schema for company information.
   * TEACHING: Organization Schema Use Cases
   * Perfect for:
   * - About pages
   * - Company information
   * - Footer contact sections
   * - Business profile pages
   * - Corporate websites
   * Rich Results:
   * Google may show:
   * - Company logo
   * - Official website
   * - Contact information
   * - Location
   * - Social media links
   * - Knowledge panel
   * Example in Google Search:
   * 	[Logo] ABC Corporation
   * 	Software Development Company
   * 	San Francisco, CA | (555) 123-4567
   * 	[Facebook] [Twitter] [LinkedIn]
   * Schema.org reference: https://schema.org/Organization
   * @param data - Organization data
   * @returns OrganizationSchema object
   * @example
   * ```typescript
   * const schema = this.structuredDataService.createOrganizationSchema({
   *   name: 'ABC Corp',
   *   url: 'https://example.com',
   *   description: 'Software development company',
   *   logo: 'https://example.com/logo.png'
   * });
   * this.structuredDataService.addStructuredData(schema, 'organization');
   * ```
   */
  createOrganizationSchema(data: {
    name: string;
    url: string;
    description?: string;
    logo?: string;
    contactEmail?: string;
    contactPhone?: string;
  }): OrganizationSchema {
    /**
     * TEACHING: Required Organization Fields
     * Minimum required:
     * - @context
     * - @type
     * - name
     * - url
     * Everything else enhances the schema but is optional.
     */
    const schema: OrganizationSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Organization',
      name: data.name,
      url: data.url
    };

    // Company description
    if (data.description) {
      schema.description = data.description;
    }

    /**
     * TEACHING: Logo Requirements
     * Logo should be:
     * - Square or rectangular
     * - High resolution (Google recommends 600x60px or larger)
     * - On white or transparent background
     * - Absolute URL
     * Google uses logo in:
     * - Knowledge panels
     * - Search results
     * - Google News
     */
    if (data.logo) {
      schema.logo = data.logo;
    }


    /**
     * TEACHING: Contact Point
     * ContactPoint tells search engines how to reach the company.
     * contactType examples:
     * - "customer service"
     * - "technical support"
     * - "sales"
     * - "billing support"
     * This can appear in Google's knowledge panel with
     * a "Contact" button.
     */
    if (data.contactPhone || data.contactEmail) {
      schema.contactPoint = {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: data.contactPhone || '',
        email: data.contactEmail
      };
    }
    return schema;
  }


  /**
   * Creates WebSite schema for home page.
   * TEACHING: WebSite Schema Benefits
   * WebSite schema helps Google understand your site structure
   * and can enable special search features:
   * 1. Sitelinks Search Box
   *    - Search box appears under your site in Google results
   *    - Users can search your site directly from Google
   *    - Improves user engagement
   * 2. Site Name
   *    - Ensures Google uses your preferred site name
   *    - Shows in search results and browser tabs
   * 3. Preferred URL
   *    - Tells Google which URL is canonical for homepage
   * Use WebSite schema ONLY on homepage! Don't use on every page.
   * Schema.org reference: https://schema.org/WebSite
   * @param data - Website data
   * @returns WebSiteSchema object
   * @example
   * ```typescript
   * const schema = this.structuredDataService.createWebSiteSchema({
   *   name: 'My Awesome Site',
   *   url: 'https://example.com',
   *   description: 'The best site for...',
   *   searchUrl: 'https://example.com/search?q={search_term_string}'
   * });
   * this.structuredDataService.addStructuredData(schema, 'website');
   * ```
   */
  createWebSiteSchema(data: {
    name: string;
    url: string;
    description?: string;
    searchUrl?: string;
  }): WebSiteSchema {
    const schema: WebSiteSchema = {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: data.name,
      url: data.url
    };

    if (data.description) {
      schema.description = data.description;
    }

    /**
     * TEACHING: Sitelinks Search Box
     * If you have site search, add potentialAction with SearchAction.
     * This can trigger a search box in Google results.
     * Requirements:
     * 1. Working search function on your site
     * 2. Search results page that accepts query parameter
     * 3. URL template with {search_term_string} placeholder
     * Example URL template: "https://example.com/search?q={search_term_string}"
     * Google replaces {search_term_string} with user's search query.
     * When user searches "angular" from Google:
     * Redirects to: https://example.com/search?q=angular
     */
    if (data.searchUrl) {
      schema.potentialAction = {
        '@type': 'SearchAction',
        target: data.searchUrl,
        'query-input': 'required name=search_term_string'
      };
    }
    return schema;
  }


  /**
   * Creates BreadcrumbList schema for navigation.
   * TEACHING: Breadcrumb Schema Benefits
   * Breadcrumbs help users and search engines understand
   * site hierarchy and navigation path.
   * Without breadcrumb schema: Google shows: example.com › users › 123
   * With breadcrumb schema:  Google shows: Home › Users › John Doe
   * Much more user-friendly and informative!
   * Benefits:
   * - Better search result appearance
   * - Helps users understand page context
   * - Improves site navigation
   * - Shows site structure to Google
   * Best Practices:
   * - Include all levels (Home → Category → Subcategory → Page)
   * - Use descriptive names, not just URLs
   * - Keep it short (3-5 levels max)
   * - Match your actual breadcrumb UI
   * Schema.org reference: https://schema.org/BreadcrumbList
   * @param breadcrumbs - Array of breadcrumb items
   * @returns BreadcrumbListSchema object
   * @example
   * ```typescript
   * const schema = this.structuredDataService.createBreadcrumbSchema([
   *   { name: 'Home', url: 'https://example.com' },
   *   { name: 'Users', url: 'https://example.com/users' },
   *   { name: 'John Doe', url: 'https://example.com/users/1' }
   * ]);
   * this.structuredDataService.addStructuredData(schema, 'breadcrumbs');
   * ```
   */
  createBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; url?: string }>
  ): BreadcrumbListSchema {
    /**
     * TEACHING: Position Property
     * position is 1-indexed (starts at 1, not 0).
     * Indicates order in breadcrumb trail.
     * Position 1 = Home/Root
     * Position 2 = Category
     * Position 3 = Subcategory
     * etc.
     */
    const itemListElement = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: crumb.name,
      /**
       * TEACHING: Last Item in Breadcrumbs
       * Last item (current page) should NOT have an item/URL.
       * It represents the page you're currently on.
       * All other items should have URLs.
       */
      ...(crumb.url && { item: crumb.url })
    }));

    return {
      '@context': 'https://schema.org/',
      '@type': 'BreadcrumbList',
      itemListElement
    };
  }


  /**
   * Helper method to generate consistent script IDs.
   * TEACHING: ID Naming Convention
   * Prefix with 'structured-data-' to:
   * - Avoid conflicts with other IDs on page
   * - Make it clear what the element is
   * - Easy to find in DOM inspector
   * @param id - Base identifier
   * @returns Prefixed script ID
   */
  private getScriptId(id: string): string {
    return `structured-data-${id}`;
  }
}



/**
 * TEACHING: Testing Structured Data
 * 1. In Development:
 *    - View page source (not inspector!)
 *    - Look in <head> for <script type="application/ld+json">
 *    - Verify JSON is valid and complete
 * 2. Google Rich Results Test:
 *    - https://search.google.com/test/rich-results
 *    - Paste your URL or HTML
 *    - See if Google can parse your structured data
 *    - Check for errors or warnings
 * 3. Schema.org Validator:
 *    - https://validator.schema.org/
 *    - More strict than Google's tool
 *    - Validates against Schema.org spec
 * 4. Chrome DevTools:
 *    - Elements tab → Search for "application/ld+json"
 *    - Copy script content
 *    - Paste into JSON validator
 * Common Errors:
 * - Missing required fields (@context, @type, name)
 * - Invalid URLs (must be absolute)
 * - Wrong data types (string vs number)
 * - Nested schemas missing @type
 * - Duplicate IDs (scripts not cleaned up)
 * 
 * 
 * 	========================
 * 	Jest Unit Test Example:
 * 	========================
 * 
 * describe('StructuredDataService', () => {
 *   let service: StructuredDataService;
 *   
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({});
 *     service = TestBed.inject(StructuredDataService);
 *   });
 * 
 *   it('should create Person schema with required fields', () => {
 *     const user: User = {
 *       id: 1,
 *       name: 'John Doe',
 *       email: 'john@example.com'
 *     };
 *     
 *     const schema = service.createPersonSchema(user);
 *     
 *     expect(schema['@context']).toBe('https://schema.org/');
 *     expect(schema['@type']).toBe('Person');
 *     expect(schema.name).toBe('John Doe');
 *     expect(schema.email).toBe('john@example.com');
 *   });
 * 
 *   it('should add structured data script to document head', () => {
 *     const data: StructuredData = {
 *       '@context': 'https://schema.org/',
 *       '@type': 'Thing',
 *       'name': 'Test'
 *     };
 *     
 *     service.addStructuredData(data, 'test-schema');
 *     
 *     const script = document.getElementById('structured-data-test-schema');
 *     expect(script).toBeTruthy();
 *     expect(script?.type).toBe('application/ld+json');
 *   });
 * 
 *   it('should remove structured data script', () => {
 *     const data: StructuredData = {
 *       '@context': 'https://schema.org/',
 *       '@type': 'Thing'
 *     };
 *     
 *     service.addStructuredData(data, 'test-schema');
 *     service.removeStructuredData('test-schema');
 *     
 *     const script = document.getElementById('structured-data-test-schema');
 *     expect(script).toBeFalsy();
 *   });
 * });
 */
