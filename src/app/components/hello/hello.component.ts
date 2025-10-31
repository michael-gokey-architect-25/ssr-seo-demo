// src/app/components/hello/hello.component.ts
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css',
})
export class HelloComponent {
  message = 'Angular v20 SSR SEO Demo';
}
