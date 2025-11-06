// src/app/services/structured-data.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { StructuredData } from './structured-data.service';

describe('StructuredData', () => {
  let service: StructuredData;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructuredData]
    });
    service = TestBed.inject(StructuredData);
    document = TestBed.inject(DOCUMENT);
  });

  it('StructuredData service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add structured data to document', () => {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Person',
      name: 'Test Person'
    };

    service.addStructuredData(schema, 'test-person');

    const scriptTag = document.getElementById('structured-data-test-person');
    expect(scriptTag).toBeTruthy();
    expect(scriptTag?.textContent).toContain('Test Person');
  });

  it('should create person schema', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      jobTitle: 'Developer',
      company: 'Acme Corp',
      bio: 'Software developer',
      avatar: 'https://example.com/avatar.jpg'
    };

    const schema = service.createPersonSchema(user);

    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('John Doe');
    expect(schema.jobTitle).toBe('Developer');
  });
});


/**
 * TEACHING: Testing Structured Data
 * * 	========================
 * 	Jest Unit Test Example:
 * 	========================
 * 
 * describe('StructuredDataService', () => {
 *   let service: StructuredDataService;
 *   
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({});
 *     service = TestBed.inject(StructuredDataService);
 *   });
 * 
 *   it('should create Person schema with required fields', () => {
 *     const user: User = {
 *       id: 1,
 *       name: 'John Doe',
 *       email: 'john@example.com'
 *     };
 *     
 *     const schema = service.createPersonSchema(user);
 *     
 *     expect(schema['@context']).toBe('https://schema.org/');
 *     expect(schema['@type']).toBe('Person');
 *     expect(schema.name).toBe('John Doe');
 *     expect(schema.email).toBe('john@example.com');
 *   });
 * 
 *   it('should add structured data script to document head', () => {
 *     const data: StructuredData = {
 *       '@context': 'https://schema.org/',
 *       '@type': 'Thing',
 *       'name': 'Test'
 *     };
 *     
 *     service.addStructuredData(data, 'test-schema');
 *     
 *     const script = document.getElementById('structured-data-test-schema');
 *     expect(script).toBeTruthy();
 *     expect(script?.type).toBe('application/ld+json');
 *   });
 * 
 *   it('should remove structured data script', () => {
 *     const data: StructuredData = {
 *       '@context': 'https://schema.org/',
 *       '@type': 'Thing'
 *     };
 *     
 *     service.addStructuredData(data, 'test-schema');
 *     service.removeStructuredData('test-schema');
 *     
 *     const script = document.getElementById('structured-data-test-schema');
 *     expect(script).toBeFalsy();
 *   });
 * });
 */

