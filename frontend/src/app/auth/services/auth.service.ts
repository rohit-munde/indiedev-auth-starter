import { Injectable } from '@angular/core';
import { IForgotPasswordResponse, ILoginResponse, IRegisterResponse, IResetPasswordResponse } from '../interfaces/response';
import { HttpClient } from '@angular/common/http';
import { IForgotPasswordRequest, ILoginRequest, IRegisterRequest, IResetPasswordRequest } from '../interfaces/request';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { NotificationService } from '../../core/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURL = environment.apiUrl;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  public register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${this.baseURL}/users/register`, request);
  }

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseURL}/users/login`, request);
  }

  public forgotPassword(request: IForgotPasswordRequest): Observable<IForgotPasswordResponse> {
    return this.http.post<IForgotPasswordResponse>(`${this.baseURL}/users/forgot-password`, request);
  }

  public resetPassword(request: IResetPasswordRequest): Observable<IResetPasswordResponse> {
    return this.http.post<IResetPasswordResponse>(`${this.baseURL}/users/reset-password`, request)
  }

  isTokenExpired(token: String) {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) {
        return false; // No expiration claim, assume valid
      }

      const expiryTime = payload.exp * 1000; // JWT exp is in seconds, JS Date is in ms
      return Date.now() > expiryTime;

    } catch (error) {
      return true;
    }
  }

  getEmailFromToken(token: string): string | null {
    try {
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payloadString = atob(payloadBase64);
      const payload = JSON.parse(payloadString);

      return payload.sub || payload.email || null;
    } catch (error) {
      this.notificationService.showError("Failed to parse token" + error);
      return null;
    }
  }
}
