// src/app/components/user-detail/user-detail.component.ts
// ============================================================================
/**
 * User Detail Component
 * 
 * Displays full profile information for a single user.
 * 
 * TEACHING POINT: Detail Page Pattern
 * 
 * Detail pages are crucial for SEO:
 * - Unique content per item
 * - Rich, descriptive information
 * - Structured data (Person schema)
 * - Dynamic meta tags with user data
 * - Social sharing optimization
 * 
 * In SSR:
 * - Resolver fetches SEO data (includes user name, avatar)
 * - Component fetches full user data
 * - PersonSchema added for rich results
 * - All meta tags in server-rendered HTML
 * - Perfect for social media sharing!
 * 
 * When shared on Facebook/Twitter:
 * - Shows user's name in title
 * - Shows user's avatar as image
 * - Shows user's bio as description
 * - Looks professional and personalized!
 */

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeoService } from '../../services/seo/seo';
import { StructuredDataService } from '../../services/structured-data/structured-data';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { SeoData } from '../../models/seo-data';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);
  private readonly userService = inject(UserService);

  user: User | null = null;
  loading = true;
  userId: number = 0;

  ngOnInit(): void {
    /**
     * TEACHING: Setting SEO from Resolver
     * 
     * Resolver already ran and fetched user data.
     * SEO data includes user-specific information:
     * - User's name in title
     * - User's bio in description
     * - User's avatar as og:image
     * 
     * This all happens during SSR!
     */
    const seoData = this.route.snapshot.data['seo'] as SeoData;
    this.seoService.setSeoData(seoData);

    /**
     * TEACHING: Getting Route Parameters
     * 
     * paramMap.get() safely retrieves route params.
     * We convert string to number.
     */
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    /**
     * TEACHING: Fetching Detail Data
     * 
     * Even though resolver fetched data for SEO,
     * we fetch again for component display.
     * 
     * Why?
     * - Resolver only fetches minimal data needed for SEO
     * - Component might need full data
     * - In this demo, they're the same, but in production they might differ
     * 
     * In SSR:
     * - This HTTP call is cached via Transfer State
     * - Browser reuses cached data
     * - No duplicate network request!
     */
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;

        /**
         * TEACHING: Adding Structured Data
         * 
         * PersonSchema provides rich search results.
         * Google can show:
         * - Profile photo
         * - Job title
         * - Company
         * - Contact info
         * 
         * This is only added after user data loads.
         * Ensures schema has complete information.
         */
        if (user) {
          const personSchema = this.structuredDataService.createPersonSchema(user);
          this.structuredDataService.addStructuredData(
            personSchema,
            `user-${user.id}`
          );
        }
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.loading = false;
        // Optionally redirect to 404 page
        // this.router.navigate(['/404']);
      }
    });
  }

  /**
   * TEACHING: Cleanup
   * 
   * Remove structured data when component is destroyed.
   * Prevents duplicate schemas when navigating back.
   */
  ngOnDestroy(): void {
    if (this.user) {
      this.structuredDataService.removeStructuredData(`user-${this.user.id}`);
    }
  }
}


