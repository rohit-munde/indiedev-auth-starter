import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppRoutes } from './config/routes.config';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.auth.fullLogin.replace(/^\//, '')
  },
  {
    path: AppRoutes.auth.root,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: AppRoutes.protected.root,
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [authGuard]
  },
  {
    path: AppRoutes.errors.root,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: AppRoutes.errors.fullNotFound.replace(/^\//, '')
  }
];
