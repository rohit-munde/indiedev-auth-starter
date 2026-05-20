import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/routes.config';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: false
})
export class NotFoundComponent {
  public readonly AppRoutes = AppRoutes;
  private router = inject(Router);

  goHome(): void {
    this.router.navigate([AppRoutes.auth.fullLogin]);
  }
}
