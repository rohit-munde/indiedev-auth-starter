import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/routes.config';
import { DashboardService } from './services/dashboard.service';
import { IError } from '../../auth/interfaces/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (response) => { console.log(response) }
    })
  }

  onLogout(): void {
    console.log('Redirecting to login...');
    this.router.navigate([AppRoutes.auth.fullLogin]);
  }
}
