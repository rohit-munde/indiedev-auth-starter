import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDashboardResponse } from '../../../auth/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseURL = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getDashboard(): Observable<IDashboardResponse> {
    return this.http.get<IDashboardResponse>(`${this.baseURL}/users/dashboard`);
  }

}
