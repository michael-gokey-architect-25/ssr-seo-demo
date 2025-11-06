// src/app/components/home/home.component.ts
/**
 * Home Component, landing page of the application.
 * Demonstrating SSR with SEO optimization and structured data.
 * TEACHING POINT: Page Component Pattern
 * Page components (route components) should:
 * 1. Get SEO data from route resolver
 * 2. Set meta tags in ngOnInit
 * 3. Add structured data if needed
 * 4. Display page content
 * 5. Clean up in ngOnDestroy
 * This pattern ensures SEO tags are set during SSR!
 */

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo/seo.service';
import { StructuredDataService } from '../../services/structured-data/structured-data.service';
import { ConfigService } from '../../services/config/config.service';
import { SeoData } from '../../models/seo-data.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * TEACHING: Dependency Injection with inject()
   * Modern Angular (14+) allows inject() function.
   * Alternative to constructor injection.
   * Benefits:
   * - Cleaner code
   * - Can be used in any function
   * - Works in component fields
   */
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);
  private readonly config = inject(ConfigService);

  /**
   * TEACHING: Component Lifecycle - ngOnInit
   * ngOnInit runs once after component initialization.
   * Perfect place for:
   * - Setting up SEO
   * - Fetching data
   * - Initializing component state
   * In SSR, ngOnInit runs on the server!
   * Any meta tags set here appear in server-rendered HTML.
   */
  ngOnInit(): void {
    /**
     * TEACHING: Getting Resolved Data
     * The homeSeoResolver ran before this component loaded.
     * Data is available in route.snapshot.data
     * 	route.snapshot.data['seo'] contains our SeoData
     * We cast to SeoData for type safety.
     */
    const seoData = this.route.snapshot.data['seo'] as SeoData;

    /**
     * TEACHING: Setting SEO Tags
     * Call seoService.setSeoData() in ngOnInit.
     * This ensures tags are set:
     * - During SSR (server-rendered HTML has tags!)
     * - During CSR (client-side navigation updates tags)
     * Service handles all meta tag creation, Component just provides the data.
     */
    this.seoService.setSeoData(seoData);

    /**
     * TEACHING: Adding Structured Data
     * Home page is perfect for WebSite schema.
     * This helps Google:
     * - Show sitelinks search box
     * - Understand site structure
     * - Display site name correctly
     * WebSite schema should ONLY be on homepage!
     */
    const websiteSchema = this.structuredDataService.createWebSiteSchema({
      name: this.config.siteName,
      url: this.config.baseUrl,
      description: seoData.description || 'Angular SSR Demo Application'
    });
    this.structuredDataService.addStructuredData(websiteSchema, 'website');
  }


  /**
   * TEACHING: Component Lifecycle - ngOnDestroy
   * ngOnDestroy runs when component is destroyed.
   * Perfect place for cleanup:
   * - Unsubscribe from observables
   * - Remove event listeners
   * - Clear timers
   * - Remove structured data
   * Important: Clean up structured data to prevent duplicates
   * when navigating away and back to this page.
   */
  ngOnDestroy(): void {
    /**
     * TEACHING: Structured Data Cleanup
     * Remove the WebSite schema when leaving homepage.
     * Prevents duplicate schemas if user navigates back.
     * Good practice: Always clean up in ngOnDestroy.
     */
    this.structuredDataService.removeStructuredData('website');
  }
}

/**
 * TEACHING: Why This Pattern Works for SSR
 * Flow with SSR:
 * 	1. User requests /
 * 	2. Server receives request
 * 	3. Angular routes to HomeComponent
 * 	4. homeSeoResolver runs first (fetches SEO data)
 * 	5. HomeComponent.ngOnInit() runs
 * 	6. seoService.setSeoData() sets meta tags
 * 	7. structuredDataService adds JSON-LD
 * 	8. Component renders template
 * 	9. Server sends complete HTML with all meta tags!
 * 	10. Browser receives fully-formed page
 * 	11. User sees content immediately
 * 	12. Angular hydrates (makes interactive)
 * Flow with CSR (client-side navigation):
 * 	1. User clicks link to /
 * 	2. Angular router navigates
 * 	3. Resolver runs in browser
 * 	4. Component initializes
 * 	5. Meta tags updated
 * 	6. Component renders
 * 	7. All happens in browser (fast!)
 * Same code works for both SSR and CSR!
 */
