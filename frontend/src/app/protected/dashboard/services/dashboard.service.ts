import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseURL = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getDashboard(): Observable<string> {
    return this.http.get<string>(`${this.baseURL}/users/dashboard`);
  }

}
