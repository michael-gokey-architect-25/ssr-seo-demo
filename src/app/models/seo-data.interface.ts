// src/app/models/seo-data.interface.ts

/**
 * SEO Data Interface
 * Defines the complete SEO metadata for a page.
 * Used by resolvers to provide data to components.
 * TEACHING POINT: Why TypeScript Interfaces?
 * Interfaces provide type safety:
 * - Autocomplete in IDE
 * - Compile-time error checking
 * - Documentation through code
 * - Prevents typos and bugs
 * Example without interface (dangerous!):
 *  seoService.setSeoData({ titl: 'My Page' }); // Typo! No error!
 * Example with interface (safe!):
 *  seoService.setSeoData({ titl: 'My Page' }); // Compile error! ✓
 */


/**
 * Main SEO data structure used throughout the application.
 * All fields are optional to allow partial updates,
 * but resolvers should provide complete data.
 */
export interface SeoData {
  /**
   * Page title, Shows in:
   * - Browser tab
   * - Search results
   * - Bookmarks
   * Best practices:
   * - 50-60 characters
   * - Include brand name
   * - Descriptive and unique
   * Example: "John Doe - User Profile | Angular SSR Demo"
   */
  title?: string;

  /**
   * Meta description, Shows in:
   * - Search result snippets
   * - Social media shares (if no OG description)
   * Best practices:
   * - 150-160 characters
   * - Include target keywords
   * - Call to action
   * - Unique per page
   * Example: "View John Doe's profile including contact information, 
   * company details, and more. Connect with John today!"
   */
  description?: string;

  /**
   * Meta keywords (legacy, but harmless)
   * Google doesn't use this for ranking anymore, but some search engines still do.
   * Example: ['user', 'profile', 'john doe', 'software engineer']
   */
  keywords?: string[];

  /**
   * Open Graph / Twitter Card image URL
   * TEACHING: Image Requirements
   * Open Graph:
   * - Recommended: 1200x630px
   * - Minimum: 600x315px
   * - Format: JPG, PNG
   * - Max size: 8MB
   * Twitter:
   * - Large card: 1200x628px (2:1 ratio)
   * - Summary: 144x144px (square)
   * Must be absolute URL (https://...)
   * Example: 'https://images.unsplash.com/photo-123?w=1200&h=630'
   */
  image?: string;

  /**
   * Canonical URL (absolute)
   * TEACHING: Why Canonical URLs?
   * Tells search engines which URL is the "official" version.
   * Problem without canonical:
   * - /users/1
   * - /users/1?source=email
   * - /users/1?utm_campaign=spring
   * All show same content but look like different pages!
   * Search engines might penalize as duplicate content.
   * 
   * Solution with canonical: 
   * All point to: /users/1 as the canonical URL
   * Must be absolute URL: https://yoursite.com/users/1
   */
  url?: string;

  /**
   * Open Graph type, Tells social platforms what kind of content this is.
   * Common types:
   * - 'website': General pages (home, about)
   * - 'article': Blog posts, news articles
   * - 'profile': User profiles
   * - 'product': E-commerce products
   * Full spec at: https://ogp.me/#types
   */
  type?: 'website' | 'article' | 'profile' | 'product';

  /**
   * Whether to prevent search engine indexing
   * true = <meta name="robots" content="noindex,nofollow">
   * false = <meta name="robots" content="index,follow">
   * Use noindex for:
   * - Admin pages
   * - Duplicate content
   * - Low-quality pages
   * - Private pages
   * - Checkout flows
   */
  noIndex?: boolean;

  /**
   * Article/Content author name, Used for:
   * - Article pages
   * - Blog posts
   * - Author attribution
   * Example: "John Doe"
   */
  author?: string;

  /**
   * ISO 8601 timestamp of publication
   * Format: "2024-01-15T10:30:00Z"
   * Important for:
   * - News articles
   * - Blog posts
   * - Time-sensitive content
   */
  publishedTime?: string;

  /**
   * ISO 8601 timestamp of last modification
   * Format: "2024-01-15T10:30:00Z"
   * Helps search engines:
   * - Understand content freshness
   * - Prioritize crawling updated pages
   */
  modifiedTime?: string;

  /**
   * Site name (brand)
   * Example: "Angular SSR Demo"
   * Shows in social shares: "Article Title | Site Name"
   */
  siteName?: string;

  /**
   * Locale for internationalization
   * Format: language_TERRITORY, Examples:
   * - 'en_US' (English - United States)
   * - 'en_GB' (English - United Kingdom)
   * - 'es_ES' (Spanish - Spain)
   * - 'fr_FR' (French - France)
   * - 'us_DA' (United States, Southern for Dumb Asinine)
   * Used by social platforms for language targeting
   */
  locale?: string;
}



/**
 * Open Graph specific data
 * 
 * Facebook, LinkedIn, WhatsApp, Slack, and many other platforms
 * use Open Graph tags to create rich previews.
 * 
 * TEACHING: Open Graph Protocol
 * 
 * Created by Facebook, now widely adopted.
 * Allows any web page to become a "rich object" in social graphs.
 * 
 * Test your OG tags:
 * https://developers.facebook.com/tools/debug/
 */
export interface OpenGraphData {
  /**
   * OG title (can differ from page title)
   * Example: Shorter, catchier version for social media
   */
  title: string;

  /**
   * OG description (can differ from meta description)
   * Example: More engaging copy for social shares
   */
  description: string;

  /**
   * OG image URL (absolute)
   * This is what shows in social media previews! Make it eye-catching and relevant.
   */
  image: string;

  /**
   * Canonical URL for this content
   */
  url: string;

  /**
   * Content type
   */
  type: string;

  /**
   * Site name (optional)
   */
  siteName?: string;

  /**
   * Locale (optional)
   */
  locale?: string;
}


/**
 * Twitter Card Data
 * Twitter has its own meta tags for rich previews.
 * Falls back to Open Graph if Twitter tags not present.
 * TEACHING: Twitter Cards
 * Four card types:
 * 1. summary: Small square image
 * 2. summary_large_image: Large rectangular image (most common)
 * 3. app: Mobile app promotion
 * 4. player: Video/audio player
 * Test your cards: https://cards-dev.twitter.com/validator
 */
export interface TwitterCardData {
  /**
   * Card type
   * summary_large_image is most popular:
   * - Shows large image above title
   * - Better engagement
   * - 2:1 aspect ratio (1200x628px)
   */
  card: 'summary' | 'summary_large_image' | 'app' | 'player';

  /**
   * Twitter handle of website
   * Format: "@username" (include @)
   * Example: "@angular"
   * Shows as: "by @angular" in card
   */
  site?: string;

  /**
   * Twitter handle of content creator, Shows author attribution
   * Format: "@username" (include @)
   * Example: "@johndoe"
   */
  creator?: string;

  /**
   * Twitter card title
   * Can differ from OG title and page title. Optimize for Twitter audience.
   */
  title: string;

  /**
   * Twitter card description
   * Can differ from OG and meta descriptions.
   */
  description: string;

  /**
   * Twitter card image
   * Can differ from OG image. Optimize for Twitter display.
   */
  image: string;
}



