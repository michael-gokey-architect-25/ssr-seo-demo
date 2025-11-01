// src/app/services/seo/seo.spec.ts

import { TestBed } from '@angular/core/testing';
import { Seo } from './seo';



describe('Seo', () => {
  let service: Seo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Seo);
  });

  it('Service should be created: SEO', () => {
    expect(service).toBeTruthy();
  });
});

