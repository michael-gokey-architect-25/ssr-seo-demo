// src/app/resolvers/user-list-seo.resolver.ts
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { SeoData } from "../../models/seo-data";
import { ConfigService } from "../../services/config/config";

/**
 * User List Page SEO Resolver, provides SEO metadata for the user list/directory page.
 * TEACHING: Directory/List Page SEO
 * Directory pages (lists of items) are great for SEO:
 * - Lots of internal links (good for PageRank)
 * - Target category keywords
 * - Gateway to detail pages
 * - Good for site architecture
 * Best practices:
 * - Descriptive title: "All Users" not just "Users"
 * - Description mentions what users can do
 * - Keywords include variations: "users", "directory", "profiles", "members"
 * - Generic but relevant image
 */

export const userListSeoResolver: ResolveFn<SeoData> = (route) => {
  const config = inject(ConfigService);

  /**
   * TEACHING: URL Construction
   * Always use absolute URLs for:
   * - Canonical URLs
   * - Open Graph URLs
   * - Structured data
   * Use ConfigService.getFullUrl() helper for consistency.
   */
  const pageUrl = config.getFullUrl('/users');

  return {
    title: `All Users - ${config.siteName}`,
    description: 'Browse our complete directory of users with full profiles, contact information, and professional details. Connect with developers, designers, and engineers.',
    keywords: [
      'users',
      'directory',
      'profiles',
      'contacts',
      'developers',
      'engineers',
      'team members'
    ],
    /**
     * TEACHING: Team/Group Images
     * For list/directory pages, use images that represent:
     * - Groups of people
     * - Teams working together
     * - Community feeling
     * - Professional setting
     */
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop',
    url: pageUrl,
    type: 'website',
    siteName: config.siteName
  };
  
};

