// src/app/resolvers/user-detail-seo.resolver.spec.ts
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { userDetailSeoResolver } from './user-detail-seo-resolver';


describe('userDetailSeoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userDetailSeoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created, userDetailSeoResolver', () => {
    expect(executeResolver).toBeTruthy();
  });
});
