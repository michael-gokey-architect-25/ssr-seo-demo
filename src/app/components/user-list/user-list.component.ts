// src/app/components/user-list/user-list.component.ts

/**
 * User List Component, Displays a directory of all users in a card grid layout.
 * TEACHING POINT: List/Directory Page Pattern
 * List pages are important for:
 * - Site navigation and hierarchy
 * - Internal linking (good for SEO)
 * - User discovery
 * - PageRank distribution
 * SEO Strategy:
 * - Each user card links to detail page
 * - Descriptive link text (user names)
 * - Structured layout
 * - Fast loading (SSR)
 * In SSR:
 * - Resolver sets meta tags
 * - UserService fetches data
 * - Template renders with data
 * - Full HTML sent to browser
 * - Search engines see complete page!
 */

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeoService } from '../../services/seo/seo.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.interface';
import { SeoData } from '../../models/seo-data.interface';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  error(error: any) {
    throw new Error('Method not implemented.');
  }
  load() {
    throw new Error('Method not implemented.');
  }
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly userService = inject(UserService);

  /**
   * TEACHING: Component State
   * users$: Observable of user array
   * - Could subscribe and store in array
   * - But using async pipe in template is better!
   * Why async pipe?
   * - Automatic subscription/unsubscription
   * - No memory leaks
   * - Cleaner code
   * - Works great with SSR
   */
  users: User[] = [];
  loading = true;

  ngOnInit(): void {
    /**
     * TEACHING: Setting SEO from Resolver,  
     * Same pattern as other components:
     * 1. Get data from resolver
     * 2. Set SEO tags
     * 3. Component continues initialization
     */
    const seoData = this.route.snapshot.data['seo'] as SeoData;
    this.seoService.setSeoData(seoData);

    /**
     * TEACHING: Fetching Data, In SSR:
     * - This runs on server
     * - Data fetched on server
     * - Response cached in Transfer State
     * - Browser reuses cached data
     * - No duplicate API call!
     * This is the magic of Angular SSR + HttpClient.
     */
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }
}

