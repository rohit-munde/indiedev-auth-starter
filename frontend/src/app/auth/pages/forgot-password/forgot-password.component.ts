import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../../config/routes.config';
import { AuthService } from '../../services/auth.service';
import { IForgotPasswordResponse } from '../../interfaces/response';
import { NotificationService } from '../../../core/notification/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: false
})
export class ForgotPasswordComponent {
  public readonly AppRoutes = AppRoutes;
  private fb = inject(FormBuilder);

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isSubmitted = false;

  onSubmit(): void {
    if (this.forgotForm.valid) {
      console.log('Forgot Password Request for:', this.forgotForm.value);
      this.authService.forgotPassword(this.forgotForm.value).subscribe({
        next: (response: IForgotPasswordResponse) => {
          this.notificationService.showSuccess(response.message)
        }
      })
      this.isSubmitted = true;
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
