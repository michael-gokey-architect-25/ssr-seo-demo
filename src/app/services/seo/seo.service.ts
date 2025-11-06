// src/app/services/seo.service.ts
/**
 * SEO Service
 * Manages all SEO-related meta tags for the application.
 * This is a server-safe implementation using Angular's platform-agnostic APIs.
 * 
 * TEACHING POINT: Server-Safe Code
 * In SSR, code runs on BOTH server and browser.
 * We can't use browser-specific globals like:
 * - window
 * - document
 * - localStorage
 * - navigator
 * 
 * Instead, we use Angular's dependency injection tokens:
 * - DOCUMENT (instead of global document)
 * - PLATFORM_ID (to check if server or browser)
 * 
 * This ensures our code works everywhere! Features:
 * - Page title management
 * - Meta descriptions
 * - Meta keywords
 * - Open Graph tags (Facebook, LinkedIn, WhatsApp)
 * - Twitter Card tags
 * - Canonical URLs
 * - Robots meta tags (noindex/nofollow)
 * 
 * Usage Example:
 * ```typescript
 * constructor(private seo: SeoService) {}
 * 
 * ngOnInit() {
 *   this.seo.setSeoData({
 *     title: 'My Page Title',
 *     description: 'Page description for SEO',
 *     image: 'https://example.com/image.jpg',
 *     url: 'https://example.com/page',
 *     type: 'website'
 *   });
 * }
 * ```
 * @see https://angular.dev/guide/ssr for SSR best practices
 * @see https://ogp.me for Open Graph protocol
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards for Twitter Cards
 */
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SeoData } from '../../models/seo-data.interface';


@Injectable({
  providedIn: 'root'
})
export class SeoService {
  /**
   * TEACHING: Dependency Injection
   * 
   * inject() is the modern way to inject dependencies (Angular 14+).
   * Alternative to constructor injection.
   * 
   * Benefits:
   * - Cleaner code
   * - Works in any function (not just constructors)
   * - Easier to test
   */
  
  /**
   * Angular's Title service manages <title> tag
   * Server-safe and works in both environments
   */
  private readonly titleService = inject(Title);
  
  /**
   * Angular's Meta service manages <meta> tags
   * Server-safe, uses platform-agnostic DOM operations
   */
  private readonly meta = inject(Meta);
  
  /**
   * DOCUMENT token provides access to the document
   * Works on both server and browser
   * NEVER use global 'document' in SSR apps!
   */
  private readonly document = inject(DOCUMENT);
  
  /**
   * PLATFORM_ID helps identify current platform
   * Use with isPlatformBrowser() / isPlatformServer()
   */
  private readonly platformId = inject(PLATFORM_ID);


  /**
   * Sets complete SEO data for the current page.
   * This is the main method you'll use in components.
   * 
   * TEACHING: Why One Method vs Many?
   * 
   * A single setSeoData() method is better than multiple setTitle(),
   * setDescription(), etc. methods because:
   * 
   * 1. Atomic operation - all tags set together
   * 2. Prevents partial updates that could leave stale tags
   * 3. Easier to test (one method to mock)
   * 4. Simpler API for consumers
   * 5. Ensures consistency across all meta tags
   * 
   * @param data - Complete SEO configuration object
   * 
   * @example
   * ```typescript
   * this.seoService.setSeoData({
   *   title: 'John Doe - User Profile',
   *   description: 'View John\'s profile and contact information',
   *   image: 'https://images.unsplash.com/photo-123',
   *   url: 'https://mysite.com/users/1',
   *   type: 'profile'
   * });
   * ```
   */
  setSeoData(data: SeoData): void {
    // Set page title
    if (data.title) {
      this.setTitle(data.title);
    }

    // Set meta description
    if (data.description) {
      this.setDescription(data.description);
    }

    // Set meta keywords (legacy but harmless)
    if (data.keywords && data.keywords.length > 0) {
      this.setKeywords(data.keywords);
    }

    // Set canonical URL
    if (data.url) {
      this.setCanonicalUrl(data.url);
    }

    // Set robots meta tag
    this.setRobots(!data.noIndex);

    /**
     * TEACHING: Open Graph Tags
     * 
     * Open Graph (OG) tags control how pages appear when shared on:
     * - Facebook
     * - LinkedIn
     * - WhatsApp
     * - Slack
     * - Many messaging apps
     * 
     * Without OG tags, platforms make guesses (often wrong!).
     * With OG tags, you control the preview exactly.
     */
    this.setOgTags({
      title: data.title || '',
      description: data.description || '',
      image: data.image || '',
      url: data.url || '',
      type: data.type || 'website',
      siteName: data.siteName,
      locale: data.locale
    });

    /**
     * TEACHING: Twitter Cards
     * 
     * Twitter has its own meta tags for rich previews.
     * Falls back to Open Graph if Twitter tags not present.
     * 
     * We set both OG and Twitter tags for maximum compatibility.
     */
    this.setTwitterTags({
      card: 'summary_large_image',
      title: data.title || '',
      description: data.description || '',
      image: data.image || ''
    });

    /**
     * TEACHING: Article-Specific Tags
     * 
     * For blog posts and articles, add publish/modified dates.
     * Helps search engines understand content freshness.
     */
    if (data.publishedTime) {
      this.meta.updateTag({ 
        property: 'article:published_time', 
        content: data.publishedTime 
      });
    }

    if (data.modifiedTime) {
      this.meta.updateTag({ 
        property: 'article:modified_time', 
        content: data.modifiedTime 
      });
    }

    if (data.author) {
      this.meta.updateTag({ 
        name: 'author', 
        content: data.author 
      });
    }
  }


  /**
   * Sets the page title.
   * 
   * TEACHING: Page Title Best Practices
   * 
   * - Keep it under 60 characters (Google truncates at ~60)
   * - Include brand name: "Page Title | Brand Name"
   * - Put important keywords first
   * - Make each page title unique
   * - Be descriptive and accurate
   * 
   * Good: "Angular SSR Tutorial - Complete Guide | My Site"
   * Bad: "Home" or "Page" or super long titles...
   * 
   * @param title - The page title to set
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }


  /**
   * Sets the meta description tag.
   * 
   * TEACHING: Meta Description Best Practices
   * 
   * - 150-160 characters (Google shows ~160)
   * - Include target keywords naturally
   * - Write for humans, not just search engines
   * - Include a call to action
   * - Make it unique per page
   * - Accurately describe the page content
   * 
   * Good: "Learn how to implement Server-Side Rendering in Angular 20
   * with complete SEO optimization. Step-by-step tutorial with code examples."
   * 
   * Bad: "This is a page about stuff" or keyword stuffing
   * 
   * @param description - The meta description content
   */
  setDescription(description: string): void {
    this.meta.updateTag({ 
      name: 'description', 
      content: description 
    });
  }


  /**
   * Sets the meta keywords tag.
   * 
   * TEACHING: Are Keywords Still Relevant?
   * 
   * Google officially doesn't use meta keywords for ranking (since 2009).
   * However:
   * - Some other search engines still use them
   * - They don't hurt (unless stuffed with spam)
   * - They can help internal site search
   * - They document page focus for your team
   * 
   * Use them, but don't obsess over them.
   * Focus on quality content instead!
   * 
   * @param keywords - Array of keyword strings
   */
  setKeywords(keywords: string[]): void {
    const keywordString = keywords.join(', ');
    this.meta.updateTag({ 
      name: 'keywords', 
      content: keywordString 
    });
  }


  /**
   * Sets the canonical URL link tag.
   * 
   * TEACHING: Canonical URLs Explained
   * 
   * Problem: Multiple URLs can show the same content:
   * - https://example.com/page
   * - https://example.com/page?source=email
   * - https://example.com/page?utm_campaign=summer
   * 
   * Search engines see these as 3 different pages!
   * This can:
   * - Dilute your page authority
   * - Trigger duplicate content penalties
   * - Split analytics tracking
   * 
   * Solution: Canonical URL tells search engines which is "official"
   * <link rel="canonical" href="https://example.com/page">
   * 
   * All variations point to the canonical version.
   * Search engines consolidate ranking signals to that URL.
   * 
   * @param url - The canonical URL (must be absolute)
   */
  setCanonicalUrl(url: string): void {
    /**
     * TEACHING: DOM Manipulation in SSR
     * 
     * We use this.document instead of global document.
     * this.document works on both server and browser.
     * 
     * Steps:
     * 1. Remove existing canonical tag (if any)
     * 2. Create new link element
     * 3. Set rel and href attributes
     * 4. Append to document head
     */
    
    // Remove existing canonical tag
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Create and append new canonical tag
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }


  /**
   * Sets the robots meta tag.
   * 
   * TEACHING: Robots Meta Tag
   * 
   * Controls search engine crawling and indexing:
   * 
   * index: Allow this page in search results
   * noindex: Don't include in search results
   * follow: Follow links on this page
   * nofollow: Don't follow links on this page
   * 
   * Common combinations:
   * - "index,follow" - Normal page (default)
   * - "noindex,nofollow" - Don't index, don't follow links
   * - "noindex,follow" - Don't index this page, but follow its links
   * 
   * Use noindex for:
   * - Thank you pages
   * - Checkout pages
   * - Admin pages
   * - Duplicate content
   * - Low-quality pages
   * 
   * @param shouldIndex - true for index,follow; false for noindex,nofollow
   */
  setRobots(shouldIndex: boolean): void {
    const content = shouldIndex ? 'index,follow' : 'noindex,nofollow';
    this.meta.updateTag({ 
      name: 'robots', 
      content 
    });
  }


  /**
   * Sets Open Graph meta tags.
   * 
   * TEACHING: Open Graph Tags in Detail
   * 
   * Open Graph Protocol (ogp.me) allows any web page to become
   * a "rich object" in social graphs.
   * 
   * Core tags:
   * - og:title - Title of your object (not page title)
   * - og:type - Type of object (website, article, profile, etc.)
   * - og:image - Image URL (1200x630px recommended)
   * - og:url - Canonical URL
   * 
   * Optional tags:
   * - og:description - Brief description
   * - og:site_name - Site name (brand)
   * - og:locale - Language/locale (en_US, es_ES, etc.)
   * 
   * When someone shares your page on Facebook:
   * 1. Facebook's crawler fetches your page
   * 2. Looks for OG tags in <head>
   * 3. Generates preview using OG data
   * 4. User sees rich preview with image, title, description
   * 
   * Test your OG tags:
   * https://developers.facebook.com/tools/debug/
   * 
   * @param data - Open Graph data object
   */
  private setOgTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName?: string;
    locale?: string;
  }): void {
    // Core OG tags (required)
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: data.type });

    // Optional OG tags
    if (data.siteName) {
      this.meta.updateTag({ property: 'og:site_name', content: data.siteName });
    }

    if (data.locale) {
      this.meta.updateTag({ property: 'og:locale', content: data.locale });
    }

    /**
     * TEACHING: OG Image Requirements
     * 
     * Facebook/LinkedIn recommendations:
     * - Size: 1200x630px (1.91:1 ratio)
     * - Min: 600x315px
     * - Max: 8MB
     * - Format: JPG or PNG
     * 
     * Image should:
     * - Be high quality
     * - Have clear focal point
     * - Work without text (some platforms crop)
     * - Be hosted on fast, reliable CDN
     * 
     * We use Unsplash for demo:
     * https://images.unsplash.com/photo-...?w=1200&h=630&fit=crop
     */
    
    // OG image dimensions (optional but recommended)
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }


  /**
   * Sets Twitter Card meta tags.
   * 
   * TEACHING: Twitter Cards Explained
   * 
   * Twitter has its own meta tags for rich tweets.
   * If Twitter tags not present, Twitter falls back to OG tags.
   * 
   * We set both for maximum compatibility.
   * 
   * Card Types:
   * 1. summary - Small square image, title, description
   * 2. summary_large_image - Large image, title, description (most popular)
   * 3. app - Mobile app promotion
   * 4. player - Video/audio player embedded
   * 
   * Tags:
   * - twitter:card - Card type
   * - twitter:title - Title (can differ from OG title)
   * - twitter:description - Description
   * - twitter:image - Image URL
   * - twitter:site - Website's Twitter @username
   * - twitter:creator - Content creator's Twitter @username
   * 
   * When someone shares your page on Twitter:
   * 1. Twitter's card bot fetches your page
   * 2. Looks for twitter:* tags (falls back to og:* if not found)
   * 3. Generates card preview
   * 4. User sees enhanced tweet with media
   * 
   * Test your cards:
   * https://cards-dev.twitter.com/validator
   * 
   * @param data - Twitter Card data object
   */
  private setTwitterTags(data: {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    title: string;
    description: string;
    image: string;
    site?: string;
    creator?: string;
  }): void {
    // Core Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: data.card });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });

    /**
     * TEACHING: Twitter Site vs Creator
     * 
     * twitter:site - The Twitter @username of website owner
     * Example: twitter:site = "@angular" for Angular's site
     * 
     * twitter:creator - The Twitter @username of content creator
     * Example: twitter:creator = "@johndoe" for article author
     * 
     * Both show attribution in the card.
     * Site shows "via @angular"
     * Creator shows "by @johndoe"
     */
    
    // Optional: Set these in ConfigService or pass them in
    if (data.site) {
      this.meta.updateTag({ name: 'twitter:site', content: data.site });
    }

    if (data.creator) {
      this.meta.updateTag({ name: 'twitter:creator', content: data.creator });
    }
  }


  /**
   * Clears all SEO tags from the document.
   * 
   * TEACHING: When to Clear Tags?
   * 
   * Usually not necessary - setSeoData() updates existing tags.
   * But useful for:
   * - Testing
   * - Cleanup in ngOnDestroy()
   * - Resetting to defaults
   * 
   * Note: This doesn't remove title tag (titles should always exist)
   */
  clearAllTags(): void {
    // Remove meta description
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('name="author"');
    this.meta.removeTag('name="robots"');

    // Remove Open Graph tags
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:site_name"');
    this.meta.removeTag('property="og:locale"');

    // Remove Twitter Card tags
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('name="twitter:site"');
    this.meta.removeTag('name="twitter:creator"');

    // Remove canonical link
    const canonical = this.document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.remove();
    }
  }
}



export { Title };
/**
 * TEACHING: Testing This Service
 * 
 * Jest unit test example:
 * 
 * describe('SeoService', () => {
 *   let service: SeoService;
 *   let titleService: Title;
 *   let metaService: Meta;
 * 
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({});
 *     service = TestBed.inject(SeoService);
 *     titleService = TestBed.inject(Title);
 *     metaService = TestBed.inject(Meta);
 *   });
 * 
 *   it('should set page title', () => {
 *     service.setTitle('Test Page');
 *     expect(titleService.getTitle()).toBe('Test Page');
 *   });
 * 
 *   it('should set meta description', () => {
 *     service.setDescription('Test description');
 *     const tag = metaService.getTag('name="description"');
 *     expect(tag?.content).toBe('Test description');
 *   });
 * 
 *   it('should set Open Graph tags', () => {
 *     service.setSeoData({
 *       title: 'Test',
 *       description: 'Test desc',
 *       image: 'https://example.com/img.jpg',
 *       url: 'https://example.com',
 *       type: 'website'
 *     });
 *     
 *     const ogTitle = metaService.getTag('property="og:title"');
 *     expect(ogTitle?.content).toBe('Test');
 *   });
 * });
 */

// Yes, thats a lot to take in, reread it, and let it sink in. 
