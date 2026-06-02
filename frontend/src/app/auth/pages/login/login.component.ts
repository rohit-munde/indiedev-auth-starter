import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../config/routes.config';
import { AuthService } from '../../services/auth.service';
import { ILoginRequest } from '../../interfaces/request';
import { ILoginResponse } from '../../interfaces/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  public readonly AppRoutes = AppRoutes;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor(private authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  hidePassword = true;

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted:', this.loginForm.value);
      const request = this.createLoginRequest();
      this.authService.login(request).subscribe({
        next: (payload: ILoginResponse) => {
          const data = payload.data
          // localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('token', data.token);
          this.router.navigate([AppRoutes.protected.fullDashboard]);
        }
      })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  createLoginRequest(): ILoginRequest {
    return {
      email: this.loginForm.get("email")?.value || '',
      password: this.loginForm.get("password")?.value || '',
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault(); // Prevent accidental form submissions
    this.hidePassword = !this.hidePassword;
  }
}
