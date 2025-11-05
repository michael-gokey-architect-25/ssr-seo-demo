// src/app/resolvers/user-list-seo.resolver.ts
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { userListSeoResolver } from './user-list-seo-resolver';


describe('userListSeoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userListSeoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created, userListSeoResolver', () => {
    expect(executeResolver).toBeTruthy();
  });
  
});
