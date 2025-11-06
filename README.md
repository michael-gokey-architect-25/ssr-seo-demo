
# Angular SSR + SEO Demo
A comprehensive demonstration of Server-Side Rendering in Angular 20 with complete SEO optimization including meta tags, Open Graph, Twitter Cards, structured data, and modern web development best practices.


## 🎯 Overview

This project showcases production-ready patterns for implementing SSR and SEO in Angular applications. Every file is extensively documented with teaching comments to help junior developers and teams understand the concepts.

### Key Features

- ✅ **Server-Side Rendering (SSR)** - Fast initial page loads with Angular Universal
- ✅ **Complete SEO** - Dynamic meta tags, Open Graph, Twitter Cards, canonical URLs
- ✅ **Structured Data** - JSON-LD schemas for rich search results
- ✅ **Mixed Rendering** - SSR + SSG (Static Site Generation) + CSR
- ✅ **Performance** - Client hydration, event replay, HTTP Transfer State caching
- ✅ **Static Site Generation (SSG)**
- ✅ **Sitemap & robots.txt**
- ✅ **Fully functional pages** 4x
- ✅ **Mock data** (with real API migration guide)
- ✅ **Unsplash image integration**
- ✅ **Modern Angular** - Angular 20, standalone components, TypeScript
- ✅ **Extensive teaching comments throughout every file**
- ✅ **Angular Material styling**
- ✅ **Responsive design**
- ✅ **Accessibility features**
- ✅ **Fully Documented** - Teaching comments throughout codebase
- ✅ **Testing** - Jest unit tests with examples

.


## 📚 For Junior Developers

This project is designed as a learning resource. The codebase includes:

- **Inline Teaching Comments** - Every concept explained
- **Pattern Documentation** - Why decisions were made
- **Best Practices** - Industry-standard approaches
- **Migration Guides** - How to integrate with real APIs
- **Testing Examples** - Jest unit tests with explanations

Start reading from these files:
1. `src/app/services/seo.service.ts` - Learn about tag management
2. `src/app/app.config.ts` - Understand hydration
3. `src/app/resolvers/*` - See how SEO data flows
4. `src/app/components/*` - Apply patterns in components




## Important files
- `src/main.ts` — application bootstrap (providers, Material, router).
- `src/app/app.routes.ts` — central route definitions.
- `src/app/app.component.ts` — root standalone component with `router-outlet`.
- `src/app/components/hello/hello.component.ts` — simple presentational component to verify routing.
- `src/app/components/user-list/user-list.component.ts` — standalone component that fetches users (can be refactored to use `UserService`).
- `src/app/services/user.service.ts` — optional, recommended for separation of concerns.
- `jest.config.ts`, `setup-jest.ts`, `tsconfig.spec.json` — Jest configuration and setup.


.

----------------------------

.




## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd angular-ssr-demo

# Install dependencies
npm install
```

### Development

```bash
# Development server (with SSR)
npm run dev:ssr

# Open browser
http://localhost:4200
```

### Production Build

```bash
# Build for production (SSR + SSG)
npm run build:ssr

# Serve production build
npm run serve:ssr

# Open browser
http://localhost:4000
```

### Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

.


## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Page components
│   │   ├── home/           # Home page (SSR)
│   │   ├── user-list/      # User directory (SSR)
│   │   ├── user-detail/    # User profile (SSR)
│   │   └── about/          # About page (SSG)
│   ├── services/           # Core services
│   │   ├── seo.service.ts              # SEO meta tag management
│   │   ├── structured-data.service.ts  # JSON-LD schemas
│   │   ├── user.service.ts             # User data (mock)
│   │   └── config.service.ts           # App configuration
│   ├── resolvers/          # Route resolvers for SEO
│   │   ├── home-seo.resolver.ts
│   │   ├── user-list-seo.resolver.ts
│   │   ├── user-detail-seo.resolver.ts
│   │   └── about-seo.resolver.ts
│   ├── models/             # TypeScript interfaces
│   │   ├── seo-data.interface.ts
│   │   ├── structured-data.interface.ts
│   │   └── user.interface.ts
│   ├── app.routes.ts       # Client routes
│   ├── app.routes.server.ts # Server render modes
│   ├── app.config.ts       # App configuration
│   └── app.config.server.ts # Server configuration
├── main.ts                 # Client bootstrap
├── main.server.ts          # Server bootstrap
└── server.ts               # Express server
```

.


## 🎓 Key Concepts

### Server-Side Rendering (SSR)

SSR renders your Angular application on the server for each request:

**Benefits:**
- Fast First Contentful Paint (FCP)
- Better Core Web Vitals scores
- SEO-friendly (meta tags in HTML source)
- Social media sharing works perfectly

**How it works:**
1. User requests `/users/1`
2. Express server receives request
3. Angular renders component on server
4. Resolver provides SEO data
5. SeoService sets meta tags
6. Structured data added
7. Full HTML sent to browser
8. Browser displays immediately
9. Angular hydrates (makes interactive)


### Static Site Generation (SSG)

SSG pre-renders pages at build time:

**Benefits:**
- Fastest possible page load
- Minimal server CPU usage
- CDN-friendly
- Scales infinitely

**When to use:**
- About pages
- Terms of service
- Documentation
- Any static content

**Example:** Our About page uses `RenderMode.Prerender`

.


### SEO Implementation

#### Meta Tags

```typescript
// Dynamic meta tags per route
this.seo.setSeoData({
  title: 'Page Title | Site Name',
  description: 'Page description for search results',
  keywords: ['angular', 'ssr', 'seo'],
  image: 'https://example.com/image.jpg',
  url: 'https://example.com/page',
  type: 'website'
});
```

#### Open Graph Tags

For social media sharing (Facebook, LinkedIn, WhatsApp):

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
```

#### Twitter Cards

For Twitter previews:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

#### Structured Data (JSON-LD)

For rich search results:

```typescript
// Person schema for user profiles
const schema = this.structuredData.createPersonSchema(user);
this.structuredData.addStructuredData(schema, 'user-123');
```

Generates:

```json
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Software Engineer"
}
```

### Route Resolvers

Resolvers fetch SEO data BEFORE component loads:

```typescript
export const userDetailSeoResolver: ResolveFn<SeoData> = (route) => {
  const userId = Number(route.paramMap.get('id'));
  const userService = inject(UserService);
  
  return userService.getUserById(userId).pipe(
    map(user => ({
      title: `${user.name} - Profile`,
      description: user.bio,
      image: user.avatar,
      // ... more SEO data
    }))
  );
};
```

**Why?** Meta tags are set during SSR, included in HTML source!

.


## 🔄 Mock Data vs Real API

### Current Implementation

Uses mock data in `UserService` for demo purposes:

```typescript
private mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', ... },
  // ...
];

getUsers(): Observable<User[]> {
  return of(this.mockUsers).pipe(delay(100));
}
```

### Migration to JSONPlaceholder API

Step-by-step guide in `user.service.ts`:

```typescript
// 1. Inject HttpClient
constructor(private http: HttpClient) {}

// 2. Replace getUsers()
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  ).pipe(
    map(users => users.map(user => ({
      ...user,
      avatar: `https://i.pravatar.cc/300?u=${user.id}`,
      bio: `${user.name} from ${user.address?.city}`
    }))),
    catchError(error => {
      console.error('Error:', error);
      return of([]);
    })
  );
}
```

### Benefits of Mock Data

- ✅ Works immediately without setup
- ✅ No CORS issues
- ✅ Consistent for testing
- ✅ StackBlitz compatible
- ✅ No external dependencies

.


## 🖼️ Image Handling

### Unsplash for Demo

We use Unsplash for placeholder images:

```typescript
image: 'https://images.unsplash.com/photo-123?w=1200&h=630&fit=crop'
```

**Parameters:**
- `w=1200` - Width 1200px (OG recommended)
- `h=630` - Height 630px (OG recommended)
- `fit=crop` - Crop to exact dimensions

### Production Recommendations

For production, use:
- Your own CDN (Cloudinary, Imgix)
- User uploads to cloud storage
- Optimized, responsive images
- WebP format with fallbacks

.


## 🧪 Testing Strategy

### Phase 1: Unit Tests (Current)

Testing services in isolation:

```typescript
describe('SeoService', () => {
  it('should set page title', () => {
    service.setTitle('Test Page');
    expect(titleService.getTitle()).toBe('Test Page');
  });
});
```

**Run tests:**
```bash
npm test
npm test -- --coverage
```

### Phase 2: Integration Tests (Documented)

Test component + service interaction:

```typescript
describe('HomeComponent Integration', () => {
  it('should set SEO meta tags on init', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    
    const description = metaService.getTag('name="description"');
    expect(description?.content).toContain('Angular SSR');
  });
});
```

### Phase 3: E2E Tests (Documented)

Test entire SSR pipeline:

```typescript
describe('SSR E2E', () => {
  it('should have meta tags in HTML source', async () => {
    const response = await fetch('http://localhost:4000/');
    const html = await response.text();
    
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<script type="application/ld+json">');
  });
});
```

.


## 📊 SEO Validation Tools

### Testing Your SEO

1. **Meta Tags Debugger**
   - https://metatags.io/
   - Paste URL, see all meta tags
   - Preview social media cards

2. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Test Open Graph tags
   - See Facebook preview

3. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Test Twitter Card tags
   - See Twitter preview

4. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Test structured data
   - See if eligible for rich results

5. **Lighthouse**
   - Chrome DevTools → Lighthouse tab
   - Audit performance, SEO, accessibility
   - Get actionable recommendations

### Verifying SSR

View page source (not inspector!):
```
Right-click → View Page Source
or
Ctrl+U / Cmd+U
```

You should see:
- Complete HTML content
- All meta tags in `<head>`
- JSON-LD scripts
- Full component markup

If you only see `<app-root></app-root>`, SSR isn't working!

.


## 🚀 Deployment

### Build for Production

```bash
npm run build:ssr
```

This creates:
- `dist/browser/` - Client bundle
- `dist/server/` - Server bundle
- Prerendered HTML for SSG routes

### Hosting Options

**Node.js Server:**
```bash
npm run serve:ssr
```

Deploy to:
- Heroku
- DigitalOcean
- AWS EC2
- Google Cloud Run

**Static Hosting (SSG only):**

If using only `RenderMode.Prerender`:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

**Container:**

```dockerfile
FROM node:18
WORKDIR /app
COPY dist/ .
CMD ["node", "server/server.mjs"]
```


### Environment Variables

Update `ConfigService` for different environments:

```typescript
// config.service.ts
readonly baseUrl = process.env['BASE_URL'] || 'http://localhost:4200';
```
.


## 🔧 Configuration

### Server Routes (Render Modes)

Edit `app.routes.server.ts`:

```typescript
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },        // SSR
  { path: 'about', renderMode: RenderMode.Prerender }, // SSG
  { path: 'admin', renderMode: RenderMode.Client },    // CSR
];
```

### Sitemap & Robots

Server automatically generates:
- `/sitemap.xml` - List of pages
- `/robots.txt` - Crawler instructions

Customize in `server.ts`.


------------------------------

### 📖 Learning Path

#### Beginner

1. Read `seo.service.ts` - Understand meta tags
2. Read `home.component.ts` - See how components use SEO
3. Check browser inspector - See meta tags in action
4. View page source - Confirm SSR working

#### Intermediate

1. Study resolvers - How data flows before component
2. Understand hydration - How SSR transitions to CSR
3. Add new page - Apply patterns yourself
4. Customize SEO - Modify meta tags for your content

#### Advanced

1. Add real API - Integrate with backend
2. Implement caching - Optimize server performance
3. Add more schemas - Product, Article, Event, etc.
4. Deploy to production - Host on real server

----------------

### 🤝 Contributing

This is an educational project. Suggestions for improvements:

- Better teaching comments
- More examples
- Additional schemas
- Performance optimizations
- Accessibility improvements


### 📝 License

This project is created for educational purposes.


### 🙏 Acknowledgments

Built with:
- Angular 20
- Angular Material
- TypeScript
- Jest
- Express

Inspired by:
- Angular documentation
- Angular.love articles
- Community best practices

### 📞 Support

Questions about the code? Every file has teaching comments!

Look for:
- `TEACHING POINT:` - Concept explanations
- `TEACHING:` - Inline teaching notes
- Code comments - Why, not just what


## 🎯 Summary

This project demonstrates:

- ✅ **Server-Side Rendering (SSR)** - Fast initial page loads with Angular Universal
- ✅ **Complete SEO** - Dynamic meta tags, Open Graph, Twitter Cards, canonical URLs
- ✅ **Structured Data** - JSON-LD schemas for rich search results
- ✅ **Mixed Rendering** - SSR + SSG (Static Site Generation) + CSR
- ✅ **Performance** - Client hydration, event replay, HTTP Transfer State caching
- ✅ **Static Site Generation (SSG)**
- ✅ **Sitemap & robots.txt**
- ✅ **Fully functional pages** 4x
- ✅ **Mock data** (with real API migration guide)
- ✅ **Unsplash image integration**
- ✅ **Modern Angular** - Angular 20, standalone components, TypeScript
- ✅ **Extensive teaching comments throughout every file**
- ✅ **Angular Material styling**
- ✅ **Responsive design**
- ✅ **Accessibility features**
- ✅ **Fully Documented** - Teaching comments throughout codebase
- ✅ **Testing** - Jest unit tests with examples

Perfect for:
- Learning Angular SSR
- Understanding SEO implementation
- Teaching junior developers
- Starting new SSR projects
- Reference implementation

.


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
Some basic extras about Package Scripts you can use.
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
 * TEACHING: Running Tests
 * Jest:
 * npm test                    # Run all tests
 * npm test seo.service        # Run specific test file
 * npm test -- --coverage      # Run with coverage report
 * npm test -- --watch         # Run in watch mode
 * Test Output:
 * ✓ Green checkmark = test passed
 * ✗ Red X = test failed
 * Coverage Report:
 * - Shows which lines are tested
 * - Aim for >80% coverage
 * - Focus on business logic
 * Best Practices:
 * - One assertion per test (usually)
 * - Test behavior, not implementation
 * - Use descriptive test names
 * - Keep tests simple and readable
 * - Test edge cases and errors
 * - Run tests before committing
 */
 ```

--------

