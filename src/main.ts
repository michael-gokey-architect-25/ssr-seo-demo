// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/**
 * Main Application Bootstrap (Client-Side)
 * This is the entry point for the browser application.
 * It bootstraps the Angular app with client-side configuration.
 * TEACHING POINT: Browser vs Server Bootstrap
 * - main.ts: Runs in the browser
 * - main.server.ts: Runs on the server
 * - Both use same app component, different configs
 */
