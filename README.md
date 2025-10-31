
# Angular SSR & SEO Demo (SSR, Angular 20 + Material, SEO)

This starter demonstrates a minimal Angular 20 project using **standalone components**, **Angular Material**, and **Jest** for unit testing.

## Project goals
- List New Ones Here
- Standalone components (no NgModules) to showcase Angular 20 modern style.
- Central `app.routes.ts` consumed by `main.ts` via `provideRouter(...)`.
- Angular Material provided at bootstrap via `importProvidersFrom(...)`.
- Jest setup (`jest-preset-angular`) for fast, isolated unit tests.
- Small example routes: `/hello` and `/users`.

## Important files
- `src/main.ts` — application bootstrap (providers, Material, router).
- `src/app/app.routes.ts` — central route definitions.
- `src/app/app.component.ts` — root standalone component with `router-outlet`.
- `src/app/components/hello/hello.component.ts` — simple presentational component to verify routing.
- `src/app/components/user-list/user-list.component.ts` — standalone component that fetches users (can be refactored to use `UserService`).
- `src/app/services/user.service.ts` — optional, recommended for separation of concerns.
- `jest.config.ts`, `setup-jest.ts`, `tsconfig.spec.json` — Jest configuration and setup.

## Running locally
1. Install dependencies:
   ```bash
   npm install

<!-- Angular v20 Jest Starter -->

<!-- Attempting an Angular v20 Jest Starter, with Routing with standalone lazy‐loaded component,
Jest 29 + jest-preset-angular 14,
Angular Material for styling
angular-v20-jest-starter -->

--------------------------------
Notes:

**AngularJestStarter**

https://stackblitz.com/edit/angular-v20-jest-starter-base

https://stackblitz.com/edit/angular-v20-jest-starter

```
- Test Suites: 5 passed, 5 total
- Tests:       47 passed, 47 total
- Snapshots:   0 total
- Time:        23.933 s
```

--------
```
/**
 * NPM Scripts for SSR Development
 * Add these to your package.json "scripts" section:
 * {
 *   "scripts": {
 *     "dev": "ng serve",
 *     "build": "ng build",
 *     "dev:ssr": "ng serve",
 *     "build:ssr": "ng build && ng run angular-jest-starter:server:production",
 *     "serve:ssr": "node dist/angular-jest-starter/server/server.mjs",
 *     "prerender": "ng run angular-jest-starter:prerender"
 *   }
 * }
 * 
 * TEACHING: Script Explanations
 * dev:ssr:
 * - Development mode with SSR
 * - Hot reload enabled
 * - Fast for development
 * build:ssr:
 * - Production build with SSR
 * - Builds browser bundle
 * - Builds server bundle
 * - Optimized and minified
 * serve:ssr:
 * - Serves production SSR build
 * - Use after build:ssr
 * - Runs on Node.js server
 * prerender:
 * - Generates static files for SSG routes
 * - Creates HTML files at build time
 * - Use for routes with RenderMode.Prerender
 */
```
and

```
/**
 * NPM Scripts for Jest Testing
 * Add these to your package.json "scripts" section:
 * {
 * "scripts": {
 * "test": "jest --passWithNoTests",
 * "test:watch": "jest --watch",
 * "test:coverage": "jest --coverage"
 * }
 * }
 * * TEACHING: Script Explanations
 * test:
 * - Runs Jest once and exits.
 * - Executes all project test files.
 * - --passWithNoTests prevents failure if no tests are found.
 * - Ideal for CI/CD and quick checks.
 * test:watch:
 * - Runs Jest in continuous watch mode.
 * - Automatically re-runs tests on file changes (smart/fast).
 * - Stays active for instant feedback during development.
 * - Provides interactive menu for filtering tests.
 * test:coverage:
 * - Runs all tests once.
 * - Generates a detailed code coverage report.
 * - Creates a coverage/ folder with an openable HTML report.
 * - Use before releases to enforce quality/thresholds.
 */
 ```

--------

