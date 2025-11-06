// root/setup-jest.ts
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};


// Optional: Add custom matchers or configure global test settings
// Example:
// Object.defineProperty(window, 'CSS', { value: null });
// Object.defineProperty(window, 'getComputedStyle', {
//   value: () => ({
//     display: 'none',
//     appearance: ['-webkit-appearance']
//   })
// });

// Optional: Configure default timeout
// jest.setTimeout(10000);
