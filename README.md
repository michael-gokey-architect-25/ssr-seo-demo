
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


- Test Suites: 5 passed, 5 total
- Tests:       47 passed, 47 total
- Snapshots:   0 total
- Time:        23.933 s
