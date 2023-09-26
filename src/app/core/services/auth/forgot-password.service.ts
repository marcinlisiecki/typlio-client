import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  requestResetPasswordLink(email: string): Observable<{}> {
    return this.http.post<{}>(environment.apiUrl + '/users/password', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    return this.http.put<{}>(environment.apiUrl + '/users/password', { token, newPassword });
  }
}
