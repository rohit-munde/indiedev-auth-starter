import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // For now let the guard return true for authentication
  return true;
};
