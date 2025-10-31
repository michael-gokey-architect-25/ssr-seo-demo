// src/app/services/user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an Observable of users', () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should call the correct API endpoint', () => {
      service.getUsers().subscribe();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.url).toBe('https://jsonplaceholder.typicode.com/users');
      req.flush([]);
    });

    it('should handle empty response', () => {
      service.getUsers().subscribe(users => {
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush([]);
    });

    it('should handle HTTP errors', () => {
      const errorMessage = 'Network error';

      service.getUsers().subscribe({
        next: () => fail('should have failed with network error'),
        error: (error) => {
          expect(error.error).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.error(new ProgressEvent('error'), { 
        status: 500, 
        statusText: errorMessage 
      });
    });
  });
});
