import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../../config/routes.config';
import { AuthService } from '../../services/auth.service';
import { IResetPasswordRequest } from '../../interfaces/request';
import { IForgotPasswordResponse } from '../../interfaces/response';
import { NotificationService } from '../../../core/notification/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: false
})
export class ResetPasswordComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  private email: string | null;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor(private authService: AuthService, private route: ActivatedRoute, private notificationService: NotificationService) {
    this.email = "";
  }

  ngOnInit(): void {
    // Subscribe to query parameter changes
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        localStorage.setItem('reset-token', token);
        this.email = this.authService.getEmailFromToken(token);
        setTimeout(() => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { token: null },
            queryParamsHandling: 'merge',
            replaceUrl: true
          });
        })
      }
    });
  }

  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  hidePassword = true;
  hideConfirmPassword = true;

  passwordMatchValidator(form: FormGroup) {
    const pwd = form.get('password')?.value;
    const confirmPwd = form.get('confirmPassword')?.value;
    return pwd === confirmPwd ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.email) {
      const token = localStorage.getItem('reset-token') || "";
      const resquest: IResetPasswordRequest = {
        email: this.email,
        password: this.resetForm.get('password')?.value || "",
        token
      };
      this.authService.resetPassword(resquest).subscribe({
        next: (response) => {
          localStorage.removeItem('reset-token');
          this.notificationService.showSuccess(response.message);
          this.router.navigate([AppRoutes.auth.fullLogin]);
        }
      })
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
