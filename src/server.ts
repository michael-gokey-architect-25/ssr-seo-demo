// src/server.ts
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

/**
 * TEACHING: Express Server Setup
 * Express is a Node.js web framework.
 * It handles HTTP requests and routing.
 */
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  /**
   * TEACHING: CommonEngine
   * Angular's rendering engine for SSR.
   * Takes an Angular app and renders it to HTML.
   */
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  /**
   * TEACHING: Static File Serving
   * Serves JavaScript, CSS, images from /browser folder.
   * These are the compiled Angular application files.
   */
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  /**
   * TEACHING: Sitemap Endpoint
   * Search engines request /sitemap.xml to discover pages.
   * Sitemap structure:
   * <urlset>
   *   <url>
   *     <loc>https://yoursite.com/</loc>
   *     <lastmod>2024-01-01</lastmod>
   *     <changefreq>daily</changefreq>
   *     <priority>1.0</priority>
   *   </url>
   * </urlset>
   * Benefits:
   * - Faster indexing of new content
   * - Better crawl efficiency
   * - Priority hints for important pages
   */
  server.get('/sitemap.xml', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    /**
     * TEACHING: Sitemap Best Practices
     * - changefreq: How often page updates (daily, weekly, monthly)
     * - priority: 0.0 to 1.0 (relative importance within your site)
     * - lastmod: When page was last modified
     * In production, you'd dynamically generate URLs,
     * especially for user profiles or products.
     */
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/users</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(sitemap);
  });

  /**
   * TEACHING: Robots.txt Endpoint
   * Tells search engine crawlers:
   * - Which pages to crawl
   * - Which pages to avoid
   * - Where to find sitemap
   * Syntax:
   * User-agent: * (applies to all crawlers)
   * Allow: / (crawl everything)
   * Disallow: /admin/ (don't crawl admin pages)
   * Sitemap: URL to sitemap
   * Benefits:
   * - Protects private pages from indexing
   * - Manages crawl budget
   * - Points crawlers to sitemap
   */
  server.get('/robots.txt', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    /**
     * TEACHING: Robots.txt Configuration
     * User-agent: *
     * - Applies to all search engines (Google, Bing, etc.)

     * Allow: /
     * - Permit crawling of all pages
     * 
     * Disallow: /api/
     * - Block API endpoints (no SEO value, waste of crawl budget)
     * 
     * In production, you might also block:
     * - /admin/
     * - /private/
     * - /checkout/ (if duplicate content)
     * - /*?* (query parameters if they create duplicates)
     */
    const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

    res.type('text/plain');
    res.send(robots);
  });

  /**
   * TEACHING: Angular Universal Rendering
   * This is where the magic happens!
   * For all other routes, Angular renders the page:
   * 1. CommonEngine.render() executes Angular app
   * 2. Route resolver runs (fetches SEO data)
   * 3. Component initializes
   * 4. SEO service sets meta tags
   * 5. Structured data added
   * 6. Full HTML returned
   */
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

/**
 * TEACHING: Server Startup
 * Starts Express server on port 4000 (or environment variable).
 * In production, you'd use a process manager like PM2.
 */
function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

/**
 * Express Server for Server-Side Rendering
 * This is the Node.js server that handles SSR requests.
 * TEACHING POINT: How SSR Server Works
 * 1. Browser requests /users/123
 * 2. Express receives request
 * 3. Angular Universal renders the route
 * 4. Full HTML generated with all content
 * 5. Meta tags, structured data included
 * 6. HTML sent to browser
 * 7. Browser displays immediately
 * 8. Angular hydrates the page
 * Additional Endpoints:
 * - /sitemap.xml: Helps search engines discover pages
 * - /robots.txt: Tells crawlers which pages to index
 */

