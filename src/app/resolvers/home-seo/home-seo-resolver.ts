// src/app/resolvers/home-seo.resolver.ts

/**
 * Home Page SEO Resolver, provides SEO metadata for the home page.
 * TEACHING POINT: What Are Resolvers?
 * Resolvers are functions that fetch data BEFORE a route activates.
 * They run during route navigation, before the component loads.
 * Why use resolvers for SEO?
 * WITHOUT Resolvers:
 * 	1. Route navigates → Component loads
 * 	2. ngOnInit() runs
 * 	3. Component fetches data
 * 	4. Component sets meta tags
 * 	❌ Problem: Meta tags set AFTER initial render
 * 	❌ In SSR: Meta tags NOT in server-generated HTML!
 * WITH Resolvers:
 * 	1. Route navigation starts
 * 	2. Resolver runs and fetches data
 * 	3. Data available before component loads
 * 	4. Component gets data immediately
 * 	5. Meta tags set during first render
 * 	✅ Success: Meta tags IN server-generated HTML!
 * ResolveFn Type:
 * - Modern functional resolver (Angular 14+)
 * - Simpler than class-based resolvers
 * - Can use inject() for DI
 * - Return data directly or as Observable
 * @see https://angular.dev/guide/routing/common-router-tasks#resolve
 */
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SeoData } from '../../models/seo-data.interface';
import { ConfigService } from '../../services/config/config.service';


/**
 * TEACHING: Resolver Signature
 * ResolveFn<SeoData> means:
 * - This resolver returns SeoData
 * - Can return SeoData directly
 * - Can return Observable<SeoData>
 * - Can return Promise<SeoData>
 * Parameters:
 * - route: ActivatedRouteSnapshot - Current route info
 * - state: RouterStateSnapshot - Router state (optional, not used here)
 */
export const homeSeoResolver: ResolveFn<SeoData> = (route) => {
  /**
   * TEACHING: inject() in Resolvers
   * inject() is the modern way to get dependencies.
   * Works anywhere in the injection context, including resolvers!
   * Alternative (older style):
   * const config = route.parent?.parent?.injector.get(ConfigService);
   */
  const config = inject(ConfigService);

  /**
   * TEACHING: Home Page SEO Strategy
   * Home page is most important for SEO:
   * - First impression
   * - Usually highest traffic
   * - Brand representation
   * - Entry point for new users
   * Best practices for home page meta tags:
   * - Clear, descriptive title with brand
   * - Compelling description (150-160 chars)
   * - Target primary keywords
   * - High-quality og:image (represents brand)
   * - Type: 'website' (not article or profile)
   */
  return {
    title: `${config.siteName} - Modern Angular SSR with Complete SEO`,
    description: 'A comprehensive demonstration of Angular Server-Side Rendering with full SEO optimization including meta tags, Open Graph, Twitter Cards, structured data, and more.',
    keywords: [
      'angular',
      'ssr',
      'server-side rendering',
      'seo',
      'meta tags',
      'open graph',
      'twitter cards',
      'angular 20',
      'web development'
    ],
    /**
     * TEACHING: OG Image Selection
     * Home page image should:
     * - Represent your brand/product
     * - Be eye-catching
     * - Include branding (logo, colors)
     * - Work at 1200x630px
     * We use a tech-themed Unsplash image for demo.
     * In production: use your branded image!
     */
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    url: config.baseUrl,
    type: 'website',
    siteName: config.siteName,
    locale: config.defaultLocale
  };
};

