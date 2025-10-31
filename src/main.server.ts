// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

/**
 * Main Application Bootstrap (Server-Side)
 * This is the entry point for server-side rendering.
 * It bootstraps the Angular app with server-specific configuration.
 * TEACHING POINT: Server Bootstrap
 * - Runs on Node.js server
 * - Uses serverConfig in addition to appConfig
 * - Enables SSR features like prerendering
 */
