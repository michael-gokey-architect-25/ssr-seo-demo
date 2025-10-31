// src/app/components/user-list/user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        HttpClientTestingModule,
        CommonModule,
        MatListModule,
        MatProgressSpinnerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no outstanding HTTP requests
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty users array', () => {
    expect(component.users).toEqual([]);
  });

  it('should initialize with loading false', () => {
    expect(component.loading).toBe(false);
  });

  it('should call the users api on ngOnInit', () => {
    fixture.detectChanges(); // triggers ngOnInit
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    
    req.flush([
      { id: 1, name: 'User A', email: 'a@example.com' },
      { id: 2, name: 'User B', email: 'b@example.com' }
    ]);
    
    expect(component.users.length).toBe(2);
    expect(component.loading).toBe(false);
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
    
    // Must flush the request to prevent "open requests" error
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush([]);
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
