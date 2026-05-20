import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/routes.config';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
  standalone: false
})
export class UnauthorizedComponent {
  public readonly AppRoutes = AppRoutes;
  private router = inject(Router);

  goHome(): void {
    this.router.navigate([AppRoutes.auth.fullLogin]);
  }
}
