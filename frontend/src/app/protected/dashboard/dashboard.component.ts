import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/routes.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent {
  private router = inject(Router);

  onLogout(): void {
    console.log('Redirecting to login...');
    this.router.navigate([AppRoutes.auth.fullLogin]);
  }
}
