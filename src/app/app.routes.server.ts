// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
    /**
     * TEACHING: Why SSR for home page?
     * - First impression matters (fast FCP)
     * - May have dynamic content (featured products, news)
     * - SEO-critical page
     * - Frequently updated content
     */
  },
  {
    path: 'users',
    renderMode: RenderMode.Server,
    /**
     * TEACHING: Why SSR for user list?
     * - User data changes frequently
     * - Need fresh data on each request
     * - Important for SEO (directory pages rank well)
     * - May have pagination/filtering (dynamic)
     */
  },
  {
    path: 'users/:id',
    renderMode: RenderMode.Server,
    /**
     * TEACHING: Why SSR for user detail?
     * - Each user has unique SEO requirements
     * - Dynamic meta tags (name, avatar, bio)
     * - Shareable on social media (needs OG tags)
     * - Profile data may update
     */
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
    /**
     * TEACHING: Why SSG for about page?
     * - Content rarely changes
     * - Same for all users
     * - Perfect candidate for static generation
     * - Fastest possible delivery (static file)
     * - Can be cached by CDN forever
     * 
     * At build time, Angular generates:
     * dist/browser/about/index.html
     * 
     * Server just serves this file, no rendering!
     */
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
    status: 404,
    /**
     * TEACHING: 404 handling with SSR
     * - Returns 404 status code (important for SEO!)
     * - Still renders Angular app (shows error page)
     * - Search engines understand page doesn't exist
     */
  }
];
/**
 * Server Route Configuration
 * Defines how each route should be rendered on the server.
 * TEACHING POINT: Rendering Modes Explained
 * 1. RenderMode.Server (SSR)
 *    - Renders on EVERY request
 *    - Server executes Angular, generates HTML
 *    - Use for: Dynamic content, user-specific data
 *    - Examples: User profiles, product pages, search results
 *    - Pros: Always fresh data, personalized content
 *    - Cons: Server CPU usage, slower than SSG
 * 2. RenderMode.Prerender (SSG - Static Site Generation)
 *    - Renders ONCE at build time
 *    - Generates static HTML files
 *    - Use for: Content that rarely changes
 *    - Examples: About page, terms of service, help docs
 *    - Pros: Lightning fast, minimal server load, CDN-friendly
 *    - Cons: Must rebuild to update content
 * 3. RenderMode.Client (CSR - Client-Side Rendering)
 *    - Traditional Angular behavior
 *    - Browser downloads JS, renders in browser
 *    - Use for: Authenticated areas, admin panels
 *    - Examples: Dashboards, settings pages
 *    - Pros: No server rendering needed, full client-side control
 *    - Cons: Slower FCP, poor SEO, empty initial HTML
 * Strategy: Mix modes for optimal performance!
 * - SSG for static pages (about, terms)
 * - SSR for dynamic, public pages (products, articles)
 * - CSR for authenticated areas (dashboards)
 */
