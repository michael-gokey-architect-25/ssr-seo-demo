// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hello', pathMatch: 'full' },
  { path: 'hello', component: HelloComponent },
  { path: 'users', component: UserListComponent },
  // optional catch-all: { path: '**', redirectTo: 'hello' }
];
