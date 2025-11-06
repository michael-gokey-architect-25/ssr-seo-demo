// src/app/services/user.service.ts
/**
 * User Service
 * Provides user data for the application.
 * Currently uses MOCK data for demo purposes.
 * TEACHING POINT: Mock Data vs Real API Integration
 * This service is intentionally designed with mock data to:
 * 1. Work immediately without backend setup
 * 2. Run on StackBlitz without API CORS issues
 * 3. Demonstrate SSR concepts without external dependencies
 * 4. Provide consistent data for testing
 * MIGRATION TO REAL API (JSONPlaceholder):
 * JSONPlaceholder is a free fake REST API for testing:
 * https://jsonplaceholder.typicode.com/
 * 
 * Endpoints:
 * - GET /users - List all users
 * - GET /users/:id - Get specific user
 * Step-by-Step Migration:
 * 1. INJECT HttpClient:
 *    constructor(private http: HttpClient) {}
 * 
 * 2. REPLACE getUsers():
 *    getUsers(): Observable<User[]> {
 *      return this.http.get<User[]>(
 *        'https://jsonplaceholder.typicode.com/users'
 *      ).pipe(
 *        map(users => users.map(user => ({
 *          ...user,
 *          avatar: `https://i.pravatar.cc/300?u=${user.id}`,
 *          bio: `${user.name} from ${user.address?.city}`,
 *          jobTitle: user.company?.name
 *        }))),
 *        catchError(error => {
 *          console.error('Error fetching users:', error);
 *          return of([]); // Return empty array on error
 *        })
 *      );
 *    }
 * 
 * 3. REPLACE getUserById():
 *    getUserById(id: number): Observable<User> {
 *      return this.http.get<User>(
 *        `https://jsonplaceholder.typicode.com/users/${id}`
 *      ).pipe(
 *        map(user => ({
 *          ...user,
 *          avatar: `https://i.pravatar.cc/300?u=${user.id}`,
 *          bio: `${user.name} works at ${user.company?.name}`,
 *          jobTitle: 'Employee'
 *        })),
 *        catchError(error => {
 *          console.error('Error fetching user:', error);
 *          throw error; // Or return a default user
 *        })
 *      );
 *    }
 * 
 * 4. UPDATE User interface to match API response
 *    JSONPlaceholder returns different field structure!
 * 
 * 5. HANDLE SSR considerations:
 *    - HTTP calls work on both server and client
 *    - Angular's HttpClient caches responses in SSR
 *    - Transfer State automatically serializes data
 *    - No duplicate API calls during hydration!
 * 
 * OTHER API OPTIONS:
 * - Your own backend API
 * - Firebase
 * - Supabase
 * - GraphQL endpoints
 * - Any REST API
 * Key point: Observable pattern works with any data source!
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * TEACHING: Mock Data Structure
   * This array simulates a database or API response.
   * In production, this would come from HttpClient.
   * Note: We use Unsplash images for avatars.
   * Format: https://images.unsplash.com/photo-{id}?w=300&h=300&fit=crop
   * The ?w=300&h=300&fit=crop parameters:
   * - w=300: Width 300px
   * - h=300: Height 300px
   * - fit=crop: Crop to exact dimensions
   * For og:image, we'll use w=1200&h=630 (recommended OG size)
   */
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      username: 'alicej',
      email: 'alice.johnson@example.com',
      phone: '+1-555-0101',
      website: 'https://alicejohnson.dev',
      company: {
        name: 'TechCorp Solutions',
        catchPhrase: 'Innovating the future of technology'
      },
      address: {
        street: '123 Tech Lane',
        city: 'San Francisco',
        zipcode: '94102'
      },
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=630&fit=crop',
      bio: 'Full-stack developer passionate about Angular and TypeScript. Building scalable web applications with modern best practices.',
      jobTitle: 'Senior Software Engineer'
    },
    {
      id: 2,
      name: 'Bob Martinez',
      username: 'bobm',
      email: 'bob.martinez@example.com',
      phone: '+1-555-0102',
      website: 'https://bobmartinez.com',
      company: {
        name: 'DataDrive Inc',
        catchPhrase: 'Driving data-driven decisions'
      },
      address: {
        street: '456 Data Street',
        city: 'Austin',
        zipcode: '78701'
      },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=630&fit=crop',
      bio: 'Data scientist and machine learning enthusiast. Transforming raw data into actionable insights for businesses.',
      jobTitle: 'Lead Data Scientist'
    },
    {
      id: 3,
      name: 'Carol Wang',
      username: 'carolw',
      email: 'carol.wang@example.com',
      phone: '+1-555-0103',
      website: 'https://carolwang.design',
      company: {
        name: 'Creative Studios',
        catchPhrase: 'Designing experiences that matter'
      },
      address: {
        street: '789 Design Blvd',
        city: 'New York',
        zipcode: '10001'
      },
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&h=630&fit=crop',
      bio: 'UX/UI designer with a focus on accessible and inclusive design. Creating beautiful, user-friendly interfaces.',
      jobTitle: 'Principal UX Designer'
    },
    {
      id: 4,
      name: 'David Kumar',
      username: 'davidk',
      email: 'david.kumar@example.com',
      phone: '+1-555-0104',
      company: {
        name: 'CloudScale Systems',
        catchPhrase: 'Scaling to infinity and beyond'
      },
      address: {
        street: '321 Cloud Ave',
        city: 'Seattle',
        zipcode: '98101'
      },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
      bio: 'DevOps engineer specializing in cloud infrastructure and automation. Building robust, scalable systems.',
      jobTitle: 'DevOps Architect'
    },
    {
      id: 5,
      name: 'Emma Schmidt',
      username: 'emmas',
      email: 'emma.schmidt@example.com',
      phone: '+1-555-0105',
      website: 'https://emmaschmidt.io',
      company: {
        name: 'SecureNet Technologies',
        catchPhrase: 'Protecting your digital future'
      },
      address: {
        street: '654 Security Way',
        city: 'Boston',
        zipcode: '02101'
      },
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=630&fit=crop',
      bio: 'Cybersecurity expert focused on application security and threat prevention. Keeping the web safe.',
      jobTitle: 'Security Engineer'
    }
  ];

  /**
   * Gets all users.
   * TEACHING: Observable Pattern
   * We return Observable<User[]> even with mock data because:
   * 1. Matches real API patterns (HttpClient returns Observables)
   * 2. Makes migration to real API seamless
   * 3. Allows async operations (loading states, etc.)
   * 4. Supports RxJS operators (map, filter, etc.)
   * 	of() creates an Observable from static data.
   * 	delay(100) simulates network latency for realistic testing.
   * In real implementation:
   * return this.http.get<User[]>('https://api.example.com/users');
   * @returns Observable of User array
   */
  getUsers(): Observable<User[]> {
    /**
     * TEACHING: Why delay(100)?
     * Simulates real-world network delay.
     * Helps test:
     * - Loading states
     * - Skeleton screens
     * - Error handling
     * - User experience
     * In production, remove delay() or actual HTTP calls have real latency.
     */
    return of(this.mockUsers).pipe(
      delay(100) // Simulate network delay
    );
  }

  /**
   * Gets a single user by ID.
   * TEACHING: Error Handling
   * In mock implementation, we return first user as fallback.
   * In real implementation, you'd:
   * 1. Let HTTP error propagate
   * 2. Handle in component with catchError
   * 3. Show error message to user
   * 4. Maybe redirect to 404 page
   * Example real implementation:
   * getUserById(id: number): Observable<User> {
   *   return this.http.get<User>(`/api/users/${id}`).pipe(
   *     catchError(error => {
   *       if (error.status === 404) {
   *         // Redirect to 404 page
   *         this.router.navigate(['/404']);
   *       }
   *       throw error;
   *     })
   *   );
   * }
   * 
   * @param id - User ID to fetch
   * @returns Observable of User object
   */
  getUserById(id: number): Observable<User> {
    /**
     * TEACHING: Array.find()
     * Searches array for first element matching condition.
     * Returns undefined if not found.
     * We provide fallback to first user to prevent null errors in demo.
     * In production, handle undefined case properly!
     */
    const user = this.mockUsers.find(u => u.id === id) || this.mockUsers[0];
    
    return of(user).pipe(
      delay(100) // Simulate network delay
    );
  }

  /**
   * TEACHING: Additional Methods You Might Add
   * For a real user service, you'd typically have:

   * // Search users
   * searchUsers(query: string): Observable<User[]> {
   *   return this.http.get<User[]>(`/api/users/search?q=${query}`);
   * }
   * 
   * // Create user
   * createUser(user: Partial<User>): Observable<User> {
   *   return this.http.post<User>('/api/users', user);
   * }
   * 
   * // Update user
   * updateUser(id: number, user: Partial<User>): Observable<User> {
   *   return this.http.put<User>(`/api/users/${id}`, user);
   * }
   * 
   * // Delete user
   * deleteUser(id: number): Observable<void> {
   *   return this.http.delete<void>(`/api/users/${id}`);
   * }
   * 
   * // Get users with pagination
   * getUsersPaginated(page: number, size: number): Observable<{users: User[], total: number}> {
   *   return this.http.get(`/api/users?page=${page}&size=${size}`);
   * }
   */
}

