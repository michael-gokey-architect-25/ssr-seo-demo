// src/app/resolvers/about-seo.resolver.ts

/**
 * About Page SEO Resolver, provides SEO metadata for the about page.
 * TEACHING: Static Page SEO
 * About pages are important for:
 * - Brand trust
 * - Company information
 * - Team introduction
 * - Mission/values
 * SEO considerations:
 * - Target branded keywords
 * - Include company/product name
 * - Highlight unique value proposition
 * - Professional image
 * Note: This page uses RenderMode.Prerender in server routes!
 * It's generated once at build time (SSG) for maximum performance.
 */

export const aboutSeoResolver: ResolveFn<SeoData> = (route) => {
  const config = inject(ConfigService);
  const pageUrl = config.getFullUrl('/about');

  return {
    title: `About Us - ${config.siteName}`,
    description: 'Learn about our Angular SSR demo application showcasing modern web development best practices, including server-side rendering, complete SEO optimization, and performance excellence.',
    keywords: [
      'about',
      'angular',
      'ssr',
      'web development',
      'best practices',
      'modern web',
      'performance',
      'seo optimization'
    ],
    /**
     * TEACHING: About Page Images
     * Good choices:
     * - Team photo
     * - Office/workspace
     * - Product screenshot
     * - Brand visuals
     * - Tech/development imagery
     * Avoid:
     * - Generic stock photos
     * - Unrelated images
     * - Low quality photos
     */
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
    url: pageUrl,
    type: 'website',
    siteName: config.siteName
  };
};

/**
 * TEACHING: Using Resolved Data in Components
 * In any component, access resolved data via ActivatedRoute:
 * export class UserDetailComponent implements OnInit {
 *   private route = inject(ActivatedRoute);
 *   private seoService = inject(SeoService);
 * 
 *   ngOnInit() {
 *     // Get resolved SEO data
 *     const seoData = this.route.snapshot.data['seo'] as SeoData;
 *     
 *     // Set meta tags
 *     this.seoService.setSeoData(seoData);
 *   }
 * }
 * The data is immediately available in snapshot.data
 * because resolvers completed before component initialized!
 */

/**
 * TEACHING: Advanced Resolver Patterns
 * 1. Multiple Resolvers Per Route:
 * {
 *   path: 'users/:id',
 *   component: UserDetailComponent,
 *   resolve: {
 *     seo: userDetailSeoResolver,
 *     user: userDataResolver,
 *     comments: userCommentsResolver
 *   }
 * }
 * 
 * 2. Resolver with Error Handling:
 * export const userDetailSeoResolver: ResolveFn<SeoData> = (route) => {
 *   const userService = inject(UserService);
 *   const router = inject(Router);
 *   const userId = Number(route.paramMap.get('id'));
 * 
 *   return userService.getUserById(userId).pipe(
 *     map(user => createSeoData(user)),
 *     catchError(error => {
 *       // Redirect to 404 if user not found
 *       router.navigate(['/404']);
 *       // Return default SEO data
 *       return of(getDefaultSeoData());
 *     })
 *   );
 * };
 * 
 * 3. Resolver with Dependencies Between Data:
 * export const userPostsSeoResolver: ResolveFn<SeoData> = (route) => {
 *   const userService = inject(UserService);
 *   const postService = inject(PostService);
 *   const userId = Number(route.paramMap.get('id'));
 * 
 *   // Fetch user first, then posts
 *   return userService.getUserById(userId).pipe(
 *     switchMap(user => 
 *       postService.getUserPosts(user.id).pipe(
 *         map(posts => createSeoDataFromUserAndPosts(user, posts))
 *       )
 *     )
 *   );
 * };
 * 
 * 4. Conditional Resolution:
 * export const conditionalSeoResolver: ResolveFn<SeoData> = (route) => {
 *   const config = inject(ConfigService);
 *   const queryParam = route.queryParamMap.get('source');
 * 
 *   // Different SEO for different sources
 *   if (queryParam === 'email') {
 *     return { ...defaultSeo, description: 'Email campaign version' };
 *   }
 *   
 *   return defaultSeo;
 * };
 */


/**
 * TEACHING: Testing Resolvers, Jest unit test example:
 * describe('userDetailSeoResolver', () => {
 *   let userService: jasmine.SpyObj<UserService>;
 *   let config: ConfigService;
 * 
 *   beforeEach(() => {
 *     userService = jasmine.createSpyObj('UserService', ['getUserById']);
 *     
 *     TestBed.configureTestingModule({
 *       providers: [
 *         { provide: UserService, useValue: userService },
 *         ConfigService
 *       ]
 *     });
 *     
 *     config = TestBed.inject(ConfigService);
 *   });
 * 
 *   it('should resolve SEO data for user', (done) => {
 *     const mockUser: User = {
 *       id: 1,
 *       name: 'John Doe',
 *       email: 'john@example.com',
 *       bio: 'Software engineer'
 *     };
 *     
 *     userService.getUserById.and.returnValue(of(mockUser));
 *     
 *     const route = {
 *       paramMap: {
 *         get: (key: string) => key === 'id' ? '1' : null
 *       }
 *     } as any;
 *     
 *     const result$ = userDetailSeoResolver(route, {} as any);
 *     
 *     result$.subscribe(seoData => {
 *       expect(seoData.title).toContain('John Doe');
 *       expect(seoData.description).toContain('Software engineer');
 *       expect(seoData.type).toBe('profile');
 *       done();
 *     });
 *   });
 * });
 */
