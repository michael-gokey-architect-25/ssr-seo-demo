// src/app/app.component.ts
/**
 * App Component, is the root component of the application.
 * Contains the navigation bar and router outlet for child components.
 * TEACHING POINT: Root Component Responsibilities
 * The root component typically handles:
 * - Application-wide layout (header, footer, main content area)
 * - Navigation structure
 * - Global UI elements
 * - Router outlet for page components
 * Keep it simple! Specific page logic goes in page components.
 */
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * TEACHING: Component Class
   * 
   * This component is intentionally simple.
   * No business logic, no data fetching.
   * Just structure and navigation.
   * 
   * In larger apps, you might add:
   * - User authentication state
   * - Theme switching (dark/light mode)
   * - Global loading indicator
   * - Error handling (ErrorHandler)
   */
  
  title = 'Angular v20 SSR & SEO Demo';
}