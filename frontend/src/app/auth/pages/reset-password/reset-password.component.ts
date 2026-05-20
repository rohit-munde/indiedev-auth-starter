import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../config/routes.config';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: false
})
export class ResetPasswordComponent {
  public readonly AppRoutes = AppRoutes;
  private fb = inject(FormBuilder);
  private router = inject(Router);

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
    if (this.resetForm.valid) {
      console.log('Reset Password Form Submitted:', this.resetForm.value);
      this.router.navigate([AppRoutes.auth.fullLogin]);
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
