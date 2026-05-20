import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../../config/routes.config';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: false
})
export class ForgotPasswordComponent {
  public readonly AppRoutes = AppRoutes;
  private fb = inject(FormBuilder);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isSubmitted = false;

  onSubmit(): void {
    if (this.forgotForm.valid) {
      console.log('Forgot Password Request for:', this.forgotForm.value);
      this.isSubmitted = true;
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
