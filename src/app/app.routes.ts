// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AboutComponent } from './components/about/about.component';
import { homeSeoResolver } from '../app/resolvers/home-seo/home-seo-resolver';
import { userListSeoResolver } from '../app/resolvers/user-list-seo/user-list-seo-resolver';
import { userDetailSeoResolver } from '../app/resolvers/user-detail-seo/user-detail-seo-resolver';
import { aboutSeoResolver } from '../app/resolvers/about-seo/about-seo-resolver';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    /**
     * TEACHING: The 'seo' resolver runs before component initialization
     * Component can access resolved data via:
     * this.route.snapshot.data['seo']
     */
    resolve: { seo: homeSeoResolver }
  },
  {
    path: 'users',
    component: UserListComponent,
    resolve: { seo: userListSeoResolver }
  },

  {
    path: 'users/:id',
    component: UserDetailComponent,
    /**
     * TEACHING: Resolver has access to route params
     * Can fetch user-specific data for dynamic SEO
     */
    resolve: { seo: userDetailSeoResolver }
  },

  {
    path: 'about',
    component: AboutComponent,
    resolve: { seo: aboutSeoResolver }
  },

  {
    /**
     * TEACHING: Catch-all route for 404s
     * Redirects to home page
     * In production, you might create a dedicated 404 component
     */
    path: '**',
    redirectTo: ''
  }
];
/**
 * Application Routes (Client-Side)
 * Defines all routes and their associated components and resolvers.
 * TEACHING POINT: Route Resolvers for SEO
 * Resolvers fetch data BEFORE the route activates.
 * This ensures SEO data is available during SSR.
 * Without Resolvers:
 * 1. Component loads
 * 2. ngOnInit fetches data
 * 3. Meta tags set after render
 * ❌ Meta tags NOT in initial HTML!
 * With Resolvers:
 * 1. Route navigation starts
 * 2. Resolver fetches data
 * 3. Component receives resolved data
 * 4. Meta tags set during render
 * ✅ Meta tags IN initial HTML!
 */
