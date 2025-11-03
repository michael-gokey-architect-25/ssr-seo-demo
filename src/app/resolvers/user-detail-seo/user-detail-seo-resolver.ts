// src/app/resolvers/user-detail-seo.resolver.ts
/**
 * User Detail Page SEO Resolver, provides dynamic SEO metadata for individual user profile pages.
 * TEACHING: Dynamic SEO Resolution
 * This resolver demonstrates:
 * 	1. Accessing route parameters
 * 	2. Fetching data from service
 * 	3. Mapping data to SEO structure
 * 	4. Returning Observable (async)
 * Why is this powerful for SSR?  During SSR:
 * 	1. Server receives request for /users/123
 * 	2. Resolver extracts ID (123) from route
 * 	3. UserService fetches user data
 * 	4. Resolver creates SEO data with user's name, bio, avatar
 * 	5. Component renders with complete SEO tags
 * 	6. HTML sent to browser has personalized meta tags!
 * When shared on social media:
 * - Shows user's name in title
 * - Shows user's avatar as og:image
 * - Shows user's bio as description
 * - Looks professional and personalized!
 */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { SeoData } from '../../models/seo-data';
import { UserService } from '../../services/user/user.service';
import { ConfigService } from '../../services/config/config';


export const userDetailSeoResolver: ResolveFn<SeoData> = (route) => {
  const config = inject(ConfigService);
  const userService = inject(UserService);

  /**
   * TEACHING: Extracting Route Parameters
   * route.paramMap is the recommended way to get route params.
   * Alternative (older): route.params['id']
   * paramMap.get() returns string | null
   * We convert to number with Number() or parseInt()
   */
  const userId = Number(route.paramMap.get('id'));

  /**
   * TEACHING: Async Resolvers with RxJS
   * This resolver returns Observable<SeoData>.
   * Angular waits for the Observable to complete before activating route.
   * Flow:
   * 	1. getUserById(userId) - fetches user (Observable<User>)
   * 	2. pipe(map(...)) - transforms User to SeoData
   * 	3. Angular waits for data
   * 	4. Component receives resolved data
   * 	5. Meta tags set immediately
   * In SSR, this all happens on the server!
   * No loading state needed - data ready immediately.
   */
  return userService.getUserById(userId).pipe(
    map(user => {
      /**
       * TEACHING: Constructing Page URL
       * - Canonical URL
       * - Open Graph URL
       * - Sharing on social media
       */
      const pageUrl = config.getFullUrl(`/users/${user.id}`);

      /**
       * TEACHING: Dynamic Title Construction
       * Format: "User Name - Context | Site Name"
       * 	Good: "Alice Johnson - User Profile | Angular SSR Demo"
       * 	Bad: "User Profile" (not descriptive)
       * 	Bad: "Profile Page for User Number 123" (too wordy)
       * Include:
       * - User's actual name (important!)
       * - Context (what page is this?)
       * - Brand (for recognition)
       */
      const title = `${user.name} - User Profile | ${config.siteName}`;

      /**
       * TEACHING: Dynamic Description. Personalized descriptions are powerful in SEO
       * If user has bio: Use it (authentic, unique content)
       * If no bio: Generate from available data
       * Include:
       * - User name (for personalization)
       * - Job title (professional context)
       * - Company (credibility)
       * - Call to action ("View profile", "Connect", etc.)
       * Keep under 160 characters for full visibility in search results.
       */
      const description = user.bio || 
        `View ${user.name}'s profile. ${user.jobTitle ? `${user.jobTitle} at ${user.company?.name}. ` : ''}Contact information, professional background, and more.`;

      /**
       * TEACHING: Dynamic Keywords
       * Generate keywords from user data:
       * - Name
       * - Username
       * - Job title
       * - Company name
       * - Location (if available)
       * Mix of:
       * - Generic terms (user, profile)
       * - Specific terms (actual user data)
       * Filter out undefined values with .filter(Boolean)
       */
      const keywords = [
        'user',
        'profile',
        user.name,
        user.username,
        user.jobTitle,
        user.company?.name
      ].filter(Boolean) as string[]; // Remove undefined values

      return {
        title,
        description,
        keywords,
        /**
         * TEACHING: User Avatar as OG Image
         * Perfect for user profiles, Shows actual person when shared.
         * Requirements:
         * - High quality
         * - Absolute URL
         * - 1200x630px for best display
         * Fallback to default if no avatar.
         */
        image: user.avatar || config.defaultOgImage,
        url: pageUrl,
        /**
         * TEACHING: og:type for Profiles
         * Use type: 'profile' for user/person pages.
         * Tells social platforms this is a person's profile.
         * - 'website': Generic pages
         * - 'article': Blog posts
         * - 'product': E-commerce items
         */
        type: 'profile',
        author: user.name,
        siteName: config.siteName
      };
    })
  );
};
