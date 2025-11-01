// src/app/models/user.interface.ts
/**
 * User Interface
 * Represents a user in the application.
 * TEACHING POINT: Mock Data vs Real API
 * This interface is designed for MOCK data.
 * In a real app, you'd match your API response structure.
 * JSONPlaceholder API structure (example):
 * {
 *   id: number;
 *   name: string;
 *   username: string;
 *   email: string;
 *   address: { street, city, zipcode, geo };
 *   phone: string;
 *   website: string;
 *   company: { name, catchPhrase, bs };
 * }
 * 
 * Our interface adds SEO-friendly fields:
 * - avatar (for og:image)
 * - bio (for meta description)
 * - jobTitle (for structured data)
 */
export interface User {
  /**
   * Unique user ID
   */
  id: number;

  /**
   * Full name
   * Used in:
   * - Page title
   * - PersonSchema
   * - Display
   */
  name: string;

  /**
   * Username/handle
   * Example: "johndoe"
   */
  username: string;

  /**
   * Email address
   */
  email: string;

  /**
   * Phone number (optional)
   */
  phone?: string;

  /**
   * Personal website (optional)
   */
  website?: string;

  /**
   * Company information (optional)
   */
  company?: {
    /**
     * Company name
     */
    name: string;
    
    /**
     * Company slogan/tagline
     */
    catchPhrase: string;
  };

  /**
   * Address information (optional)
   */
  address?: {
    /**
     * Street address
     */
    street: string;
    
    /**
     * City
     */
    city: string;
    
    /**
     * Zip/postal code
     */
    zipcode: string;
  };

  /**
   * Profile avatar URL
   * TEACHING: Avatar for SEO
   * This is used for og:image in social shares.
   * When someone shares a user profile, this image appears.
   * We use Unsplash for demo purposes:
   * https://images.unsplash.com/photo-...?w=1200&h=630
   * 
   * In production:
   * - User upload to your CDN
   * - Gravatar integration
   * - Social media avatar sync
   */
  avatar?: string;

  /**
   * User bio/description
   * TEACHING: Bio for SEO
   * Used in meta description for user profile pages.
   * Should be 150-160 characters for optimal SEO.
   * Example:
   * "Software engineer passionate about Angular and TypeScript.
   * Building scalable web applications at ABC Corp."
   */
  bio?: string;

  /**
   * Job title
   * TEACHING: Job Title for Structured Data
   * Used in PersonSchema for rich search results.
   * Google may display this in search results.
   * Example: "Senior Software Engineer"
   */
  jobTitle?: string;
}

/**
 * TEACHING: Type Guards
 * TypeScript type guards help verify data at runtime.
 * Useful when data comes from external sources (APIs).
 */

/**
 * Type guard to check if object is a valid User
 * @param obj - Object to check
 * @returns true if object is a valid User
 */
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}