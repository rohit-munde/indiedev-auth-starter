import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../app/core/notification/notification.service';
import { catchError, throwError } from 'rxjs';
import { IApiError } from '../app/auth/interfaces/response';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Extract the IApiError from the HttpErrorResponse
      const apiError: IApiError | undefined = error.error;
      
      const message = apiError?.message ||
        apiError?.error ||
        error.message ||
        'An unexpected error occurred';

      notificationService.showError(message, apiError);

      return throwError(() => error);
    })
  );
};
