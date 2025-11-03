// src/app/resolvers/home-seo.resolver.spec.ts
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { homeSeoResolver } from './home-seo-resolver';


describe('homeSeoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => homeSeoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created, homeSeoResolver', () => {
    expect(executeResolver).toBeTruthy();
  });
});
