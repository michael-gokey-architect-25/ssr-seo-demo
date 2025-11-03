// src/app/services/seo/seo.spec.ts
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo';
import { Meta, Title } from '@angular/platform-browser';


describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('Service should be created: SEO', () => {
    expect(service).toBeTruthy();
  });
});


/**
 * TEACHING: Testing This Service
 * 
 * Jest unit test example:
 * 
 * describe('SeoService', () => {
 *   let service: SeoService;
 *   let titleService: Title;
 *   let metaService: Meta;
 * 
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({});
 *     service = TestBed.inject(SeoService);
 *     titleService = TestBed.inject(Title);
 *     metaService = TestBed.inject(Meta);
 *   });
 * 
 *   it('should set page title', () => {
 *     service.setTitle('Test Page');
 *     expect(titleService.getTitle()).toBe('Test Page');
 *   });
 * 
 *   it('should set meta description', () => {
 *     service.setDescription('Test description');
 *     const tag = metaService.getTag('name="description"');
 *     expect(tag?.content).toBe('Test description');
 *   });
 * 
 *   it('should set Open Graph tags', () => {
 *     service.setSeoData({
 *       title: 'Test',
 *       description: 'Test desc',
 *       image: 'https://example.com/img.jpg',
 *       url: 'https://example.com',
 *       type: 'website'
 *     });
 *     
 *     const ogTitle = metaService.getTag('property="og:title"');
 *     expect(ogTitle?.content).toBe('Test');
 *   });
 * });
 */
