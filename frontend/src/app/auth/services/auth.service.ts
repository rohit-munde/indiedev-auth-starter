import { Injectable } from '@angular/core';
import { ILoginResponse, IRegisterResponse } from '../interfaces/response';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, IRegisterRequest } from '../interfaces/request';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${this.baseURL}/users/register`, request);
  }

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseURL}/users/login`, request);
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
}
