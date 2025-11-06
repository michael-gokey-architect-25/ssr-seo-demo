//  src/app/components/about/about.component.ts

/**
 * About Component, Static about page with company/project information.

 * TEACHING POINT: Static Site Generation (SSG)
 * This page uses RenderMode.Prerender in server routes.
 * Build Time:
 * - Angular renders this page ONCE during build
 * - Generates static HTML file: dist/browser/about/index.html
 * - File includes all content, meta tags, structured data
 * Runtime:
 * - Server just serves the static HTML file
 * - No server-side rendering on each request
 * - Lightning fast delivery
 * - Can be cached by CDN forever
 * Perfect for:
 * - About pages
 * - Terms of service
 * - Privacy policy
 * - Help documentation
 * - Any content that rarely changes
 * Benefits:
 * - Fastest possible page load
 * - Minimal server load
 * - Easy CDN caching
 * - No database queries
 * - No API calls
 * Trade-off:
 * - Must rebuild to update content
 * - Can't show user-specific data
 * - Not suitable for dynamic content
 * In this component:
 * - Sets SEO tags (pre-rendered in HTML)
 * - Adds OrganizationSchema (pre-rendered)
 * - Static content about the project
 */

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SeoService } from '../../services/seo/seo.service';
import { StructuredDataService } from '../../services/structured-data/structured-data.service';
import { ConfigService } from '../../services/config/config.service';
import { SeoData } from '../../models/seo-data.interface';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);
  private readonly config = inject(ConfigService);

  ngOnInit(): void {
    /**
     * TEACHING: SEO for Prerendered Pages
     * Even though this page is prerendered, we still:
     * 1. Get SEO data from resolver
     * 2. Set meta tags
     * 3. Add structured data
     * During build time:
     * - This code runs on the build server
     * - Meta tags are set
     * - Structured data is added
     * - Final HTML is saved to file
     * During runtime:
     * - Static file is served
     * - No JavaScript execution needed for SEO
     * - Perfect for search engines!
     */
    const seoData = this.route.snapshot.data['seo'] as SeoData;
    this.seoService.setSeoData(seoData);

    /**
     * TEACHING: OrganizationSchema
     * About page is perfect place for OrganizationSchema.
     * Tells search engines about the company/project.
     * Can appear in:
     * - Knowledge panels
     * - Search results
     * - Google Maps (if local business)
     */
    const organizationSchema = this.structuredDataService.createOrganizationSchema({
      name: this.config.siteName,
      url: this.config.baseUrl,
      description: 'A comprehensive Angular SSR demonstration with complete SEO implementation',
      logo: this.config.defaultOgImage
    });

    this.structuredDataService.addStructuredData(organizationSchema, 'organization');
  }

  /**
   * TEACHING: Cleanup
   * Even for prerendered pages, clean up structured data.
   * Ensures no duplicates during client-side navigation.
   * So many people do not do this step, but it is as important as the ending blank line.
   */
  ngOnDestroy(): void {
    this.structuredDataService.removeStructuredData('organization');
  }

}
