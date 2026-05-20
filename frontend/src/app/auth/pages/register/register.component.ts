import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../config/routes.config';

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
      console.log('Register Form Submitted:', this.registerForm.value);
      this.router.navigate([AppRoutes.auth.fullLogin]);
    } else {
      this.registerForm.markAllAsTouched();
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
