import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/routes.config';
import { DashboardService } from './services/dashboard.service';
import { IError } from '../../auth/interfaces/response';
import { NotificationService } from '../../core/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);

  constructor(private dashboardService: DashboardService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (response) => { this.notificationService.showSuccess(response) }
    })
  }

  onLogout(): void {
    console.log('Redirecting to login...');
    this.router.navigate([AppRoutes.auth.fullLogin]);
  }
}
