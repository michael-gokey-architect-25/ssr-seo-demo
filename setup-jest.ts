// root/setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

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