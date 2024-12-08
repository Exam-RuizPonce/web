import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    // Si el usuario está autenticado, redirigir al dashboard
    router.navigate(['/dashboard']);
    return false; // Bloquea el acceso
  }

  return true; // Permite el acceso
};
