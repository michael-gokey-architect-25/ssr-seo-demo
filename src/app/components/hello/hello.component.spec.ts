// src/app/components/hello/hello.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { MatCardModule } from '@angular/material/card';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloComponent, MatCardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have welcome message property', () => {
    expect(component.message).toBe('Welcome to the Angular Jest Starter!');
  });

  it('should render Hello text', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Hello');
  });

  it('should render welcome message', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Welcome to the Angular Jest Starter!');
  });
});
