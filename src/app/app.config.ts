// src/app/app.config.ts
/**
 * Application Configuration (Client-Side)
 * Configures the Angular application with all necessary providers.
 * This runs on BOTH server and client.
 * TEACHING POINT: Hydration
 * provideClientHydration() enables Angular to "wake up" server-rendered HTML:
 * 1. Server sends fully rendered HTML
 * 2. Browser displays it immediately (fast FCP!)
 * 3. Angular JavaScript downloads
 * 4. Hydration attaches event listeners to existing DOM
 * 5. App becomes interactive
 * withEventReplay():
 * - Captures user clicks during hydration
 * - Replays them after hydration completes
 * - No lost interactions!
 * withHttpTransferCacheOptions():
 * - Server makes API calls, caches responses
 * - Browser reuses cached data
 * - Eliminates duplicate API calls
 * - Faster initial render
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js change detection
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Router with our route configuration
    provideRouter(routes),
    // HTTP client with fetch API (better for SSR)
    provideHttpClient(),
    // Angular Material animations
    provideAnimationsAsync()
        provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false
      })
    ),
  ]
};

/**
 * TEACHING: Client Hydration Configuration
 * This is critical for SSR performance!
 * withEventReplay():
 * - User clicks button before JS loads
 * - Click is captured and stored
 * - After hydration, click is replayed
 * - Button action executes as expected
 * withHttpTransferCacheOptions():
 * - includePostRequests: Cache POST requests (useful for GraphQL)
 * - Server fetches data, serializes it
 * - Client reads from cache instead of re-fetching
 * - Much faster initial page load
 */
