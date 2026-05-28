import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../config/routes.config';
import { AuthService } from '../../services/auth.service';
import { IRegisterRequest } from '../../interfaces/request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})
export class RegisterComponent {
  public readonly AppRoutes = AppRoutes;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor(private authService: AuthService) { }

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
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
    if (this.registerForm.valid) {
      const request = this.createRegisterRequest();
      this.authService.register(request).subscribe({
        next: (response) => {
          console.log('Register Form Submitted:', response);
        },
        error: (error) => {
          console.error("Nice error:", error)
        }
      }
      );
      this.router.navigate([AppRoutes.auth.fullLogin]);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  createRegisterRequest(): IRegisterRequest {
    return {
      fullName: this.registerForm.get("fullName")?.value || '',
      email: this.registerForm.get("email")?.value || '',
      password: this.registerForm.get("password")?.value || ''
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
