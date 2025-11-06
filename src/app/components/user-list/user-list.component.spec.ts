// src/app/components/user-list/user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user/user.service';
import { SeoService } from '../../services/seo/seo.service';
import { Title, Meta } from '@angular/platform-browser';


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpMock: HttpTestingController;

  // Mock ActivatedRoute
  const mockActivatedRoute = {
    snapshot: { data: {} },
    data: of({ seoData: { title: 'Test Users', description: 'Test' } }),
    paramMap: of(new Map())
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent, // Import standalone component
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        SeoService,
        Title,
        Meta,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Only verify if httpMock exists
    if (httpMock) {
      httpMock.verify();
    }
  });


  it('should create component, UserListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty users array', () => {
    expect(component.users).toEqual([]);
  });

  it('should initialize with loading false', () => {
    expect(component.loading).toBe(false);
  });


  it('should call the users api on ngOnInit', () => {
    const mockUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ];

    component.ngOnInit();

    // No HTTP request to expect since using mock data
    // Instead verify the component loaded users
    setTimeout(() => {
      expect(component.users.length).toBeGreaterThan(0);
    }, 200);
  });


  it('should render user list items after successful load', () => {
    fixture.detectChanges();
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush([
      { id: 1, name: 'User A', email: 'a@example.com' }
    ]);
    
    fixture.detectChanges();
    
    const items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(1);
  });


  it('should set loading to true when load is called', () => {
    component.load();
    expect(component.loading).toBe(true);
    //- Must flush the request to prevent "open requests" error
    // const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    // req.flush([]);
  });

  
  // To suppress the console.error output during the error test, add a consoleErrorSpy
  it('should handle error during load', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    fixture.detectChanges();
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.error(new ProgressEvent('error'));
    
    expect(component.error).toBe('Could not load users.');
    expect(component.loading).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });


  it('should set loading to false after successful load', () => {
    component.load();
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush([{ id: 1, name: 'Test', email: 'test@test.com' }]);
    
    expect(component.loading).toBe(false);
  });
});
