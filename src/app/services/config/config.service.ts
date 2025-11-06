// src/app/services/config.service.ts

/**
 * Configuration Service
 * Centralized configuration for the application.
 * Contains environment-specific settings and constants.
 * TEACHING POINT: Configuration Management
 * 1. Single Source of Truth
 *    - All config in one place
 *    - Easy to update across app
 *    - No hardcoded values scattered around
 * 2. Environment-Specific Values
 *    - Different URLs for dev/staging/production
 *    - Feature flags
 *    - API endpoints
 * 3. Type Safety
 *    - TypeScript ensures correct usage
 *    - Autocomplete in IDE
 *    - Compile-time error checking
 * 4. Easy Testing
 *    - Mock config in tests
 *    - Override values for different test scenarios
 * In Production:
 * You'd typically load config from:
 * - Environment variables (process.env)
 * - Configuration files (environment.ts)
 * - Remote config service
 * - Build-time injection
 * Example with environment files:
 * 
 * // environment.prod.ts
 * export const environment = {
 *   production: true,
 *   baseUrl: 'https://myapp.com',
 *   apiUrl: 'https://api.myapp.com'
 * };
 * 
 * // environment.ts (development)
 * export const environment = {
 *   production: false,
 *   baseUrl: 'http://localhost:4200',
 *   apiUrl: 'http://localhost:3000'
 * };
 * 
 * Then in ConfigService:
 * import { environment } from '../environments/environment';
 * readonly baseUrl = environment.baseUrl;
 */

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /**
   * TEACHING: Base URL Configuration
   * Base URL is the root of your application.
   * Used for:
   * - Canonical URLs
   * - Open Graph URLs
   * - Sitemap generation
   * - Absolute URL construction
   * IMPORTANT: Update this for your production deployment!
   * Examples:
   * - Development: 'http://localhost:4200'
   * - Staging: 'https://staging.myapp.com'
   * - Production: 'https://myapp.com'
   * In SSR, you might want to detect this dynamically:
   * constructor(@Inject(REQUEST) private request: Request) {
   *   this.baseUrl = `${request.protocol}://${request.headers.host}`;
   * }
   */
  readonly baseUrl = 'https://angular-ssr-demo.example.com';


  /**
   * Site name / brand name, Used in:
   * - Page titles: "Page Title | Site Name"
   * - Open Graph site_name
   * - Structured data
   * - Footer
   */
  readonly siteName = 'Angular SSR Demo';

  /**
   * Default Open Graph image
   * TEACHING: Fallback Images
   * Always have a default image for pages without specific images.
   * Requirements:
   * - 1200x630px (recommended)
   * - Absolute URL
   * - Represents your brand
   * - High quality
   * We use Unsplash for demo!
   * In production, host on your CDN for reliability.
   */
  readonly defaultOgImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop';

  /**
   * Twitter handle for the website
   * Format: '@username' (include @)
   * Shows as "via @username" in Twitter cards
   * Example: '@angular' for Angular's official account
   */
  readonly twitterSite = '@yourtwitterhandle';

  /**
   * Default locale
   * Format: language_TERRITORY 
   * Examples:
   * - 'en_US' - English (United States)
   * - 'en_GB' - English (United Kingdom)
   * - 'es_ES' - Spanish (Spain)
   * - 'fr_FR' - French (France)
   * Used in Open Graph locale property
   */
  readonly defaultLocale = 'en_US';

  /**
   * TEACHING: Feature Flags
   * Feature flags let you enable/disable features without code changes.
   * Use cases:
   * - A/B testing
   * - Gradual rollouts
   * - Kill switch for problematic features
   * - Environment-specific features
   * Example: readonly enableNewDesign = true;
   * In component:
   * if (this.config.enableNewDesign) {
   *   // Show new design
   * }
   */

  /**
   * API endpoint (if you have a backend)
   * Example:
   * readonly apiUrl = 'https://api.myapp.com';
   * 
   * Usage:
   * this.http.get(`${this.config.apiUrl}/users`);
   */
  // readonly apiUrl = 'https://api.myapp.com';

  /**
   * TEACHING: Other Common Config Values
   * // Analytics
   * 	readonly googleAnalyticsId = 'GA-XXXXXXXXX';
   * 	readonly enableAnalytics = true;
   * // Social Media
   * 	readonly facebookAppId = '1234567890';
   * 	readonly linkedInCompanyId = '1234567';
   * // Features
   * 	readonly enableDarkMode = true;
   * 	readonly enableNotifications = true;
   * 	readonly maxUploadSize = 5 * 1024 * 1024; // 5MB
   * // Pagination
   * 	readonly defaultPageSize = 20;
   * 	readonly maxPageSize = 100;
   * // Timeouts
   * 	readonly apiTimeout = 30000; // 30 seconds
   * 	readonly retryAttempts = 3;
   * // Dates
   * 	readonly dateFormat = 'MM/DD/YYYY';
   * 	readonly timeZone = 'America/New_York';
   * // Contact
   * 	readonly supportEmail = 'support@myapp.com';
   * 	readonly supportPhone = '+1-555-123-4567';
   */

  /**
   * Helper method to construct full URLs
   * @param path - Relative path (e.g., '/users/123')
   * @returns Full URL (e.g., 'https://myapp.com/users/123')
   * @example
   * const url = this.config.getFullUrl('/users/123');
   * // Returns: 'https://myapp.com/users/123'
   */
  getFullUrl(path: string): string {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseUrl}/${cleanPath}`;
  }


  /**
   * Helper method to construct image URLs with parameters
   * Useful for services like Unsplash, Cloudinary, etc.
   * that accept query parameters for image manipulation.
   * @param baseUrl - Base image URL
   * @param width - Desired width
   * @param height - Desired height
   * @returns URL with parameters
   * @example
   * const imageUrl = this.config.getImageUrl(
   *   'https://images.unsplash.com/photo-123',
   *   1200,
   *   630
   * );
   * // Returns: 'https://images.unsplash.com/photo-123?w=1200&h=630&fit=crop'
   */
  getImageUrl(baseUrl: string, width: number, height: number): string {
    // Remove existing query parameters
    const cleanUrl = baseUrl.split('?')[0];
    return `${cleanUrl}?w=${width}&h=${height}&fit=crop`;
  }
}



/**
 * TEACHING: Using ConfigService
 * In Components:
 * export class MyComponent {
 *   private config = inject(ConfigService);
 * 
 *   ngOnInit() {
 *     const url = this.config.getFullUrl('/about');
 *     console.log(this.config.siteName);
 *   }
 * }
 * 
 * In Services:
 * export class SeoService {
 *   private config = inject(ConfigService);
 * 
 *   setSeoData(data: SeoData) {
 *     const fullUrl = this.config.getFullUrl(data.url);
 *     // Use fullUrl in canonical tag
 *   }
 * }
 * 
 * In Resolvers:
 * export const userSeoResolver: ResolveFn<SeoData> = (route) => {
 *   const config = inject(ConfigService);
 *   const userId = route.params['id'];
 *   
 *   return {
 *     url: config.getFullUrl(`/users/${userId}`),
 *     siteName: config.siteName
 *   };
 * };
 */
