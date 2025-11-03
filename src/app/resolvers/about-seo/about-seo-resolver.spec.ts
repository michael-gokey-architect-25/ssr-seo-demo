// src/app/resolvers/about-seo.resolver.spec.ts
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { aboutSeoResolver } from './about-seo-resolver';


describe('aboutSeoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => aboutSeoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created, aboutSeoResolver', () => {
    expect(executeResolver).toBeTruthy();
  });



  // it('should resolve SEO data for user', (done) => {
  //    const mockUser: User = {
  //      id: 1,
  //      name: 'John Doe',
  //      email: 'john@example.com',
  //      bio: 'Software engineer'
  //    };
     
  //    userService.getUserById.and.returnValue(of(mockUser));
     
  //    const route = {
  //      paramMap: {
  //        get: (key: string) => key === 'id' ? '1' : null
  //      }
  //    } as any;
     
  //    const result$ = userDetailSeoResolver(route, {} as any);
     
  //    result$.subscribe(seoData => {
  //      expect(seoData.title).toContain('John Doe');
  //      expect(seoData.description).toContain('Software engineer');
  //      expect(seoData.type).toBe('profile');
  //      done();
  //    });
  //  });
  
});
