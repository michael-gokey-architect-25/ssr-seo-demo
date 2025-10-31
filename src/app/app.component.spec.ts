// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MatToolbarModule, MatButtonModule],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct title property', () => {
      expect(component.title).toBe('Angular Jest Starter v20');
    });
  });

  describe('Template Rendering', () => {
    it('should render mat-toolbar', () => {
      const toolbar = compiled.querySelector('mat-toolbar');
      expect(toolbar).toBeTruthy();
    });

    it('should display title in toolbar', () => {
      const toolbar = compiled.querySelector('mat-toolbar span');
      expect(toolbar?.textContent).toBe('Angular Jest Starter v20');
    });

    it('should render router-outlet', () => {
      const routerOutlet = compiled.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('should render navigation links', () => {
      const links = compiled.querySelectorAll('a[mat-button]');
      expect(links.length).toBe(2);
    });

    it('should have Hello link with correct routerLink', () => {
      const helloLink = compiled.querySelector('a[routerLink="/hello"]');
      expect(helloLink).toBeTruthy();
      expect(helloLink?.textContent?.trim()).toBe('Hello');
    });

    it('should have Users link with correct routerLink', () => {
      const usersLink = compiled.querySelector('a[routerLink="/users"]');
      expect(usersLink).toBeTruthy();
      expect(usersLink?.textContent?.trim()).toBe('Users');
    });

    it('should have content div for router-outlet', () => {
      const contentDiv = compiled.querySelector('.content');
      expect(contentDiv).toBeTruthy();
    });
  });

  describe('Routing Functionality', () => {
    it('should navigate to /hello by default', async () => {
      await router.navigate(['']);
      await fixture.whenStable();
      expect(location.path()).toBe('/hello');
    });

    it('should navigate to /hello when Hello link is clicked', async () => {
      const helloLink = compiled.querySelector('a[routerLink="/hello"]') as HTMLElement;
      helloLink.click();
      await fixture.whenStable();
      expect(location.path()).toBe('/hello');
    });

    it('should navigate to /users when Users link is clicked', async () => {
      const usersLink = compiled.querySelector('a[routerLink="/users"]') as HTMLElement;
      usersLink.click();
      await fixture.whenStable();
      expect(location.path()).toBe('/users');
    });

    // it('should apply active class to current route', async () => {
    //   await router.navigate(['/hello']);
    //   await fixture.whenStable();
    //   fixture.detectChanges(); // Important: detect changes AFTER navigation completes

    //   const helloLink = compiled.querySelector('a[routerLink="/hello"]');
    //   expect(helloLink?.classList.contains('active')).toBe(true);
    // });

    it('should handle direct navigation to /hello', async () => {
      await router.navigate(['/hello']);
      expect(location.path()).toBe('/hello');
    });

    it('should handle direct navigation to /users', async () => {
      await router.navigate(['/users']);
      expect(location.path()).toBe('/users');
    });

    it('should redirect empty path to /hello', async () => {
      await router.navigate(['']);
      await fixture.whenStable();
      expect(location.path()).toBe('/hello');
    });
  });

  describe('Material Components', () => {
    it('should render mat-toolbar with primary color', () => {
      const toolbar = compiled.querySelector('mat-toolbar[color="primary"]');
      expect(toolbar).toBeTruthy();
    });

    it('should render mat-buttons for navigation', () => {
      const buttons = compiled.querySelectorAll('[mat-button]');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have spacer element in toolbar', () => {
      const spacer = compiled.querySelector('.spacer');
      expect(spacer).toBeTruthy();
    });
  });

  describe('Router Configuration', () => {
    it('should have routes configured', () => {
      const config = router.config;
      expect(config.length).toBeGreaterThan(0);
    });

    it('should have hello route configured', () => {
      const helloRoute = routes.find(r => r.path === 'hello');
      expect(helloRoute).toBeDefined();
    });

    it('should have users route configured', () => {
      const usersRoute = routes.find(r => r.path === 'users');
      expect(usersRoute).toBeDefined();
    });

    it('should have redirect from empty path to hello', () => {
      const redirectRoute = routes.find(r => r.path === '' && r.redirectTo === '/hello');
      expect(redirectRoute).toBeDefined();
      expect(redirectRoute?.pathMatch).toBe('full');
    });
  });
});
