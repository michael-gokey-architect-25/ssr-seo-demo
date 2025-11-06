// src/app/services/config.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created, ConfigService', () => {
    expect(service).toBeTruthy();
  });

  it('should have baseUrl defined', () => {
    expect(service.baseUrl).toBeDefined();
    expect(typeof service.baseUrl).toBe('string');
  });

  it('should have siteName defined', () => {
    expect(service.siteName).toBeDefined();
  });
});
