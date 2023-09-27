import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { catchError, map, of } from 'rxjs';

export const isSameUserGuard: CanActivateFn = (route) => {
  const userService: UserService = inject(UserService);
  const userId = route.params['userId'];

  if (userId === null || userId === undefined) {
    return false;
  }

  return userService.getMe().pipe(
    map((user) => {
      return user.id === parseInt(userId);
    }),
    catchError(() => {
      return of(false);
    }),
  );
};
