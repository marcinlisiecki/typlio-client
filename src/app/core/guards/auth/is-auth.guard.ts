import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { inject } from '@angular/core';

export const isAuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuth()) {
    return true;
  }

  router.navigateByUrl('/auth/login').then();
  return false;
};
