// src/app/models/structured-data.interface.ts
/**
 * Structured Data Interfaces
 * JSON-LD (JavaScript Object Notation for Linked Data) schemas
 * help search engines understand page content.
 * 
 * TEACHING POINT: What is Structured Data?
 * Structured data is code that helps search engines understand
 * the meaning and relationships in your content.
 * 
 * Without structured data:
 * Search engine sees: "John Doe works at ABC Corp"
 * Search engine thinks: "This is text about work"
 * 
 * With structured data:
 * Search engine sees: Person schema with jobTitle property
 * Search engine thinks: "This is a person named John Doe, 
 * who is a Software Engineer at ABC Corp"
 * 
 * Benefits:
 * - Rich snippets in search results (stars, images, etc.)
 * - Knowledge graph eligibility
 * - Better semantic understanding
 * - Enhanced search appearance
 * 
 * Test your structured data: https://search.google.com/test/rich-results
 * Schema.org reference: https://schema.org/
 */

/**
 * Base structured data interface
 * All JSON-LD schemas must have @context and @type
 */
export interface StructuredData {
  /**
   * JSON-LD context
   * Always "https://schema.org/" for Schema.org types
   * Defines the vocabulary being used
   */
  '@context': string;

  /**
   * Schema type
   * Examples: Person, Organization, Product, Article, Event
   * Full list: https://schema.org/docs/full.html
   */
  '@type': string;

  /**
   * All other properties depend on the @type
   * Using index signature for flexibility
   */
  [key: string]: any;
}


/**
 * Person Schema
 * Represents an individual person.
 * Perfect for user profile pages!
 * 
 * TEACHING: Person Schema Use Cases
 * - User profiles
 * - Author pages
 * - Team member pages
 * - Contact pages
 * 
 * Rich results:
 * - Name
 * - Job title
 * - Photo
 * - Contact info
 * - Organization
 * Schema.org reference: https://schema.org/Person
 */
export interface PersonSchema extends StructuredData {
  '@type': 'Person';
  /**
   * Full name of the person
   * Required field
   */
  name: string;

  /**
   * Job title or role
   * 
   * Example: "Software Engineer"
   */
  jobTitle?: string;

  /**
   * Email address
   * 
   * Format: "john@example.com"
   */
  email?: string;

  /**
   * Telephone number
   * 
   * Format: "+1-555-555-5555"
   * Include country code for international
   */
  telephone?: string;

  /**
   * Profile image URL
   * 
   * Should be square (1:1 aspect ratio)
   * Minimum 112x112px
   */
  image?: string;

  /**
   * Profile page URL
   * 
   * Absolute URL to this person's page
   */
  url?: string;

  /**
   * Physical address
   * 
   * Using PostalAddress schema type
   */
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;  // City
    addressRegion?: string;     // State/Province
    postalCode?: string;
    addressCountry?: string;    // 2-letter country code (US, GB, etc.)
  };

  /**
   * Organization the person works for
   * Can be simple string or full Organization schema
   */
  worksFor?: string | OrganizationSchema;

  /**
   * Job role or position
   * Example: "Lead Developer"
   */
  hasOccupation?: string;
}


/**
 * Organization Schema
 * Represents a company, nonprofit, school, or other organization.
 * Perfect for about pages and company info!
 * TEACHING: Organization Schema Use Cases
 * - About page
 * - Company info
 * - Footer contact details
 * - Business pages
 * Rich results:
 * - Organization name
 * - Logo
 * - Contact information
 * - Social media links
 * Schema.org reference: https://schema.org/Organization
 */
export interface OrganizationSchema extends StructuredData {
  '@type': 'Organization';

  /**
   * Organization name
   * Required field
   */
  name: string;

  /**
   * Organization website URL
   * Required field
   */
  url: string;

  /**
   * Logo image URL
   * Guidelines:
   * - Square or rectangular
   * - High resolution
   * - Clear on white background
   */
  logo?: string;

  /**
   * Description of the organization
   * Brief summary of what the organization does
   */
  description?: string;

  /**
   * Contact information
   * Important for local businesses and customer service
   */
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;  // 'customer service', 'sales', 'support'
    email?: string;
    availableLanguage?: string[];  // ['English', 'Spanish']
  };

  /**
   * Physical location
   */
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };

  /**
   * Social media profiles
   * Array of social media URLs
   */
  sameAs?: string[];  // ['https://twitter.com/...', 'https://linkedin.com/...']

  /**
   * Founding date
   * Format: YYYY-MM-DD or YYYY
   */
  foundingDate?: string;

  /**
   * Number of employees
   * Can be exact number or range
   */
  numberOfEmployees?: number | string;
}


/**
 * WebSite Schema
 * Represents a website as a whole. Perfect for home pages!
 * TEACHING: WebSite Schema Benefits
 * - Sitelinks search box in Google
 * - Better understanding of site structure
 * - Name and alternate names for branding
 * Schema.org reference: https://schema.org/WebSite
 */
export interface WebSiteSchema extends StructuredData {
  '@type': 'WebSite';

  /**
   * Website name
   */
  name: string;

  /**
   * Website URL (homepage)
   */
  url: string;

  /**
   * Website description
   */
  description?: string;

  /**
   * Alternate names
   * Example: ["Angular SSR", "Angular SSR Demo", "SSR Demo"]
   */
  alternateName?: string[];

  /**
   * Search action for sitelinks search box
   * Enables Google to show a search box in results
   */
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;  // "https://yoursite.com/search?q={search_term_string}"
    'query-input': string;  // "required name=search_term_string"
  };
}


/**
 * BreadcrumbList Schema
 * Represents the navigation breadcrumb trail.
 * Helps search engines understand site hierarchy.
 * TEACHING: Breadcrumbs in Search Results
 * Instead of: yoursite.com › users › 123
 * Google shows: Home › Users › John Doe
 * Makes results more clickable and informative!
 * Schema.org reference:  https://schema.org/BreadcrumbList
 */
export interface BreadcrumbListSchema extends StructuredData {
  '@type': 'BreadcrumbList';
  /**
   * List of breadcrumb items
   */
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;  // 1, 2, 3, etc.
    name: string;      // Display text
    item?: string;     // URL (omit for last item)
  }>;

}

// Yes, thats a lot to take in, reread it, and let it sink in. 
