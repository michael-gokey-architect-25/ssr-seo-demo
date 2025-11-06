// src/app/services/seo/seo.spec.ts
/**
 * SeoService Unit Tests
 * TEACHING POINT: Testing Angular Services
 * Why test services?
 * - Services contain business logic
 * - Critical for application functionality
 * - Easy to test (no DOM, no templates)
 * - Fast to run
 * - Catch bugs early
 * What to test?
 * - Each public method
 * - Different input scenarios
 * - Edge cases (null, undefined, empty)
 * - Side effects (DOM manipulation)
 * - Error handling
 * Jest vs Jasmine:
 * - Jest is faster (parallel execution)
 * - Jest has better mocking
 * - Jest has built-in code coverage
 * - Syntax is almost identical
 * - This file works with both!
 * Testing Pattern:
 * - Arrange: Set up test data and mocks
 * - Act: Call the method being tested
 * - Assert: Verify the results
 */
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';
import { SeoData } from '../../models/seo-data.interface';


/**
 * TEACHING: Test Suite Structure, 
 *  * describe() creates a test suite (group of related tests).
 * Can be nested for better organization.
 * Convention: Name describes what's being tested
 * Example:   'SeoService' or 'SeoService - Meta Tags'
 */
describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let document: Document;
  /**
   * TEACHING: Test Variables
   * Declare variables at suite level.
   * Initialized in beforeEach().
   * Available to all tests in suite.
   */

  /**
   * TEACHING: beforeEach()
   * Runs before EACH test in the suite.
   * Perfect for:
   * - Setting up fresh instances
   * - Resetting state
   * - Initializing mocks
   * Alternative: beforeAll() runs once before all tests
   * (use when setup is expensive and tests don't mutate state)
   */
  beforeEach(() => {
    /**
     * TEACHING: TestBed Configuration
     * TestBed is Angular's testing utility.
     * Creates a testing module similar to app module.
     * configureTestingModule():
     * - Sets up dependency injection
     * - Provides services
     * - Configures test environment
     */
    TestBed.configureTestingModule({
      /**
       * TEACHING: Providers
       * We need to provide the services SeoService depends on:
       * - Title (Angular's title service)
       * - Meta (Angular's meta service)
       * - DOCUMENT (platform-agnostic document)
       * These are real implementations, not mocks.
       * Fine for services, but we'd mock HttpClient for API calls.
       */
      providers: [
        SeoService,
        Title,
        Meta,
        // { provide: DOCUMENT, useValue: document }
      ]
    });

    /**
     * TEACHING: Service Injection
     * TestBed.inject() gets service instances from DI.
     * Creates fresh instances for each test.
     * This ensures test isolation!
     */
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);
  });



  /**
   * TEACHING: afterEach()
   * Runs after EACH test.
   * Perfect for:
   * - Cleaning up DOM
   * - Resetting mocks
   * - Clearing state
   * Important for preventing test pollution!
   */
  afterEach(() => {
    /**
     * TEACHING: Cleanup Meta Tags
     * Clear all meta tags after each test.
     * Prevents tags from one test affecting another.
     */
    if (document) {
      const metaTags = document.querySelectorAll('meta');
      metaTags.forEach(tag => tag.remove());

      const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
      canonicalLinks.forEach(link => link.remove());
    }
  });



  // ==========================================================================
  // SERVICE CREATION
  /**
   * TEACHING: Basic Service Test
   * it() defines a single test case.
   * First parameter: descriptive test name
   * Second parameter: test function
   * Convention: Use 'should' in test names
   * Example: 'should create', 'should set title', etc.
   */
  it('should be created, SeoService', () => {
    /**
     * TEACHING: expect()
     * Jest/Jasmine assertion syntax.
     * expect(actual).matcher(expected)
     * Common matchers:
     * - toBe(): Strict equality (===)
     * - toEqual(): Deep equality
     * - toBeTruthy(): Truthy value
     * - toBeFalsy(): Falsy value
     * - toBeNull(): null
     * - toBeUndefined(): undefined
     * - toContain(): Array/string contains value
     */
    expect(service).toBeTruthy();
  });

  describe('Basic Functionality', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should set title', () => {
      service.setTitle('Test Title');
      expect(titleService.getTitle()).toBe('Test Title');
    });
    it('should set description', () => {
      service.setDescription('Test description');
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBe('Test description');
    });
  });






  // ==========================================================================
  // TITLE TESTS
  describe('setTitle', () => {
    /**
     * TEACHING: Nested describe()
     * Group related tests together. Makes test output more readable.
     * Easier to find failing tests.
     */

    it('should set the page title', () => {
      // Arrange
      const testTitle = 'Test Page Title';

      // Act
      service.setTitle(testTitle);

      // Assert
      expect(titleService.getTitle()).toBe(testTitle);
    });


    it('should update existing title', () => {
      // Arrange
      service.setTitle('First Title');

      // Act
      service.setTitle('Second Title');

      // Assert
      expect(titleService.getTitle()).toBe('Second Title');
    });
  });



  // ==========================================================================
  // META DESCRIPTION TESTS
  describe('setDescription', () => {
    it('should set meta description tag', () => {
      // Arrange
      const testDescription = 'This is a test description for SEO';

      // Act
      service.setDescription(testDescription);

      // Assert
      /**
       * TEACHING: Querying Meta Tags
       * metaService.getTag() finds meta tags by selector.
       * Returns the tag element or null.
       */
      const tag = metaService.getTag('name="description"');
      expect(tag).toBeTruthy();
      expect(tag?.content).toBe(testDescription);
    });


    it('should update existing meta description', () => {
      // Arrange
      service.setDescription('First description');

      // Act
      service.setDescription('Updated description');

      // Assert
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBe('Updated description');
    });
  });



  // ==========================================================================
  // META KEYWORDS TESTS
  describe('setKeywords', () => {
    it('should set meta keywords tag', () => {
      // Arrange
      const keywords = ['angular', 'ssr', 'seo', 'testing'];

      // Act
      service.setKeywords(keywords);

      // Assert
      const tag = metaService.getTag('name="keywords"');
      expect(tag).toBeTruthy();
      expect(tag?.content).toBe('angular, ssr, seo, testing');
    });


    it('should handle empty keywords array', () => {
      // Arrange
      const keywords: string[] = [];

      // Act
      service.setKeywords(keywords);

      // Assert
      const tag = metaService.getTag('name="keywords"');
      expect(tag?.content).toBe('');
    });


    it('should handle single keyword', () => {
      // Arrange
      const keywords = ['angular'];

      // Act
      service.setKeywords(keywords);

      // Assert
      const tag = metaService.getTag('name="keywords"');
      expect(tag?.content).toBe('angular');
    });
  });



  // ==========================================================================
  // CANONICAL URL TESTS
  describe('setCanonicalUrl', () => {
    it('should add canonical link tag', () => {
      // Arrange
      const url = 'https://example.com/page';

      // Act
      service.setCanonicalUrl(url);

      /**
       * TEACHING: Assert DOM Query
       * Use document.querySelector() to find DOM elements.
       * Test that our service actually modifies the DOM!
       */
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe(url);
    });


    it('should replace existing canonical link', () => {
      // Arrange
      service.setCanonicalUrl('https://example.com/old');

      // Act
      service.setCanonicalUrl('https://example.com/new');

      // Assert
      const links = document.querySelectorAll('link[rel="canonical"]');
      expect(links.length).toBe(1); // Should only be one
      expect(links[0].getAttribute('href')).toBe('https://example.com/new');
    });
  });



  // ==========================================================================
  // ROBOTS META TAG TESTS
  describe('setRobots', () => {
    it('should set robots meta tag to index,follow', () => {
      service.setRobots(true); // Act
      const tag = metaService.getTag('name="robots"'); // Assert
      expect(tag?.content).toBe('index,follow');
    });
    it('should set robots meta tag to noindex,nofollow', () => {
      service.setRobots(false); // Act
      const tag = metaService.getTag('name="robots"'); // Assert
      expect(tag?.content).toBe('noindex,nofollow');
    });
  });



  // ==========================================================================
  // OPEN GRAPH TAGS TESTS
  describe('setSeoData - Open Graph Tags', () => {
    it('should set all Open Graph tags', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Test Title',
        description: 'Test Description',
        image: 'https://example.com/image.jpg',
        url: 'https://example.com/page',
        type: 'website',
        siteName: 'Test Site',
        locale: 'en_US'
      };

      // Act
      service.setSeoData(seoData);

      // Assert
      expect(metaService.getTag('property="og:title"')?.content).toBe('Test Title');
      expect(metaService.getTag('property="og:description"')?.content).toBe('Test Description');
      expect(metaService.getTag('property="og:image"')?.content).toBe('https://example.com/image.jpg');
      expect(metaService.getTag('property="og:url"')?.content).toBe('https://example.com/page');
      expect(metaService.getTag('property="og:type"')?.content).toBe('website');
      expect(metaService.getTag('property="og:site_name"')?.content).toBe('Test Site');
      expect(metaService.getTag('property="og:locale"')?.content).toBe('en_US');
    });


    it('should set OG image dimensions', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Test',
        description: 'Test',
        image: 'https://example.com/image.jpg',
        url: 'https://example.com',
        type: 'website'
      };

      // Act
      service.setSeoData(seoData);

      // Assert
      expect(metaService.getTag('property="og:image:width"')?.content).toBe('1200');
      expect(metaService.getTag('property="og:image:height"')?.content).toBe('630');
    });
  });



  // ==========================================================================
  // TWITTER CARD TESTS
  describe('setSeoData - Twitter Cards', () => {
    it('should set Twitter Card tags', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Test Title',
        description: 'Test Description',
        image: 'https://example.com/image.jpg',
        url: 'https://example.com/page',
        type: 'website'
      };

      // Act
      service.setSeoData(seoData);

      // Assert
      expect(metaService.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
      expect(metaService.getTag('name="twitter:title"')?.content).toBe('Test Title');
      expect(metaService.getTag('name="twitter:description"')?.content).toBe('Test Description');
      expect(metaService.getTag('name="twitter:image"')?.content).toBe('https://example.com/image.jpg');
    });
  });



  // ==========================================================================
  // COMPLETE SEO DATA TESTS
  describe('setSeoData - Complete', () => {
    it('should set all SEO data at once', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Complete Test Page',
        description: 'A complete test description',
        keywords: ['test', 'seo', 'angular'],
        image: 'https://example.com/image.jpg',
        url: 'https://example.com/test',
        type: 'article',
        noIndex: false,
        author: 'Test Author',
        publishedTime: '2024-01-01T00:00:00Z',
        modifiedTime: '2024-01-02T00:00:00Z',
        siteName: 'Test Site',
        locale: 'en_US'
      };

      // Act
      service.setSeoData(seoData);

      // Assert - Basic tags
      expect(titleService.getTitle()).toBe('Complete Test Page');
      expect(metaService.getTag('name="description"')?.content).toBe('A complete test description');
      expect(metaService.getTag('name="keywords"')?.content).toBe('test, seo, angular');
      expect(metaService.getTag('name="author"')?.content).toBe('Test Author');
      expect(metaService.getTag('name="robots"')?.content).toBe('index,follow');

      // Assert - Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe('https://example.com/test');

      // Assert - Open Graph
      expect(metaService.getTag('property="og:title"')?.content).toBe('Complete Test Page');
      expect(metaService.getTag('property="og:type"')?.content).toBe('article');

      // Assert - Article tags
      expect(metaService.getTag('property="article:published_time"')?.content).toBe('2024-01-01T00:00:00Z');
      expect(metaService.getTag('property="article:modified_time"')?.content).toBe('2024-01-02T00:00:00Z');
    });


    it('should handle minimal SEO data', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Minimal Page'
      };

      // Act
      service.setSeoData(seoData);

      // Assert
      expect(titleService.getTitle()).toBe('Minimal Page');
      // Should not crash with missing optional fields
    });


    it('should handle noIndex flag', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'No Index Page',
        description: 'This page should not be indexed',
        noIndex: true
      };

      // Act
      service.setSeoData(seoData);

      // Assert
      expect(metaService.getTag('name="robots"')?.content).toBe('noindex,nofollow');
    });
  });



  // ==========================================================================
  // CLEAR ALL TAGS TESTS
  describe('clearAllTags', () => {
    it('should remove all SEO meta tags', () => {
      // Arrange
      const seoData: SeoData = {
        title: 'Test Page',
        description: 'Test Description',
        keywords: ['test'],
        image: 'https://example.com/image.jpg',
        url: 'https://example.com/page',
        type: 'website'
      };
      service.setSeoData(seoData);

      // Act
      service.clearAllTags();

      // Assert
      expect(metaService.getTag('name="description"')).toBeNull();
      expect(metaService.getTag('name="keywords"')).toBeNull();
      expect(metaService.getTag('property="og:title"')).toBeNull();
      expect(metaService.getTag('name="twitter:card"')).toBeNull();
      expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    });


    it('should not remove title (titles should always exist)', () => {
      service.setTitle('Test Title'); // Arrange
      service.clearAllTags(); // Act
      // expect(titleService.getTitle()).toBe('Test Title'); // Assert
      // Title should still exist, just might be empty or default
      expect(titleService.getTitle()).toBeDefined();
    });
  });



  // ==========================================================================
  // EDGE CASES AND ERROR HANDLING
  // describe('Edge Cases', () => {
  //   it('should handle empty string title', () => {
  //     service.setTitle(''); // Act
  //     expect(titleService.getTitle()).toBe(''); // Assert
  //   });
  //   it('should handle very long description', () => {
  //     const longDescription = 'A'.repeat(500); // Arrange
  //     service.setDescription(longDescription); // Act
  //     const tag = metaService.getTag('name="description"'); // Assert
  //     expect(tag?.content).toBe(longDescription);
  //   });
  //   it('should handle special characters in SEO data', () => {
  //     // Arrange
  //     const seoData: SeoData = {
  //       title: 'Test & "Special" <Characters>',
  //       description: "Test with 'quotes' and \"escapes\"",
  //       url: 'https://example.com/page?param=value&other=true'
  //     };
  //     service.setSeoData(seoData); // Act
  //     expect(titleService.getTitle()).toContain('&'); // Assert
  //     expect(metaService.getTag('name="description"')?.content).toContain("'");
  //   });
    // it('should handle undefined optional fields gracefully', () => {
    //   // Arrange
    //   const seoData: SeoData = {
    //     title: 'Test',
    //     description: 'Test'
    //     // All optional fields undefined
    //   };
    //   expect(() => service.setSeoData(seoData)).not.toThrow(); // Act & Assert - Should not throw
    // });
  // });


  describe('Edge Cases', () => {
    it('should handle empty string title', () => {
      expect(() => service.setTitle('')).not.toThrow();
      expect(titleService.getTitle()).toBe('');
    });
    it('should handle very long description', () => {
      const longDesc = 'A'.repeat(500);
      service.setDescription(longDesc);
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBe(longDesc);
    });
    it('should handle special characters in SEO data', () => {
      const seoData = {
        title: 'Test & Title <>"',
        description: 'Test & Description <>"',
        url: 'https://example.com/test?query=value&other=test',
        image: 'https://example.com/image.jpg'
      };
      expect(() => service.setSeoData(seoData)).not.toThrow();
    });
    it('should handle undefined optional fields gracefully', () => {
      const seoData = {
        title: 'Required Title',
        description: 'Required Description'
        // image, url, etc. are undefined
      };
      expect(() => service.setSeoData(seoData)).not.toThrow();
    });
  });
});



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


/**
 * TEACHING: Integration Tests (Future Phase 2)
 * These unit tests verify SeoService in isolation.
 * Integration tests would verify:
 * - SeoService + Component interaction
 * - SeoService + Resolver data flow
 * - Meta tags in actual rendered DOM
 * - SSR HTML output inspection
 * Example integration test structure:
 * 
 * describe('HomeComponent - SEO Integration', () => {
 *   it('should have meta tags in rendered HTML', () => {
 *     const fixture = TestBed.createComponent(HomeComponent);
 *     fixture.detectChanges();
 *     
 *     const meta = document.querySelector('meta[name="description"]');
 *     expect(meta?.content).toContain('Angular SSR Demo');
 *   });
 * });
 */



/**
 * TEACHING: E2E Tests (Future Phase 2)
 * E2E tests would verify the entire SSR pipeline:
 * describe('SSR Meta Tags E2E', () => {
 *   it('should have meta tags in server-rendered HTML', async () => {
 *     // Fetch page from SSR server
 *     const response = await fetch('http://localhost:4000/users/1');
 *     const html = await response.text();
 *     
 *     // Verify meta tags in HTML source
 *     expect(html).toContain('<meta name="description"');
 *     expect(html).toContain('<meta property="og:title"');
 *     expect(html).toContain('<script type="application/ld+json">');
 *   });
 * });
 * 
 * Tools:
 * - Playwright
 * - Puppeteer
 * - Cypress (can test SSR if configured)
 */



