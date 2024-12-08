//src/app/app.routes
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
