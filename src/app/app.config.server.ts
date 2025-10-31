// src/app/app.config.server.ts

/**
 * Server-Specific Configuration
 * This configuration is ONLY used during server-side rendering.
 * It merges with appConfig to provide SSR-specific features.
 * TEACHING POINT: Server Routes
 * provideServerRendering() enables SSR with route-specific configs:
 * - Which routes use SSR (Server)
 * - Which routes use SSG (Prerender)
 * - Which routes use CSR (Client)
 * - Custom headers and status codes per route
 */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * TEACHING: Server Route Configuration
 * 
 * serverRoutes defines how each route is rendered:
 * 
 * RenderMode.Server (SSR):
 * - Renders on every request
 * - Use for dynamic, personalized content
 * - Example: User profiles, shopping carts
 * 
 * RenderMode.Prerender (SSG):
 * - Renders once at build time
 * - Use for static content
 * - Example: About page, documentation
 * 
 * RenderMode.Client (CSR):
 * - Renders in browser only
 * - Use for authenticated areas
 * - Example: Admin panels, dashboards
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);


