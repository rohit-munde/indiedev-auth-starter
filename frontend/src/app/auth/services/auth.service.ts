import { Injectable } from '@angular/core';
import { IRegisterResponse } from '../interfaces/response';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../interfaces/request';
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
}
