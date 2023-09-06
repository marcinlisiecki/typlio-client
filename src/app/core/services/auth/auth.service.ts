import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '@core/interfaces/auth/login-credentials';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from '@core/interfaces/auth/jwt-response';
import { environment } from '@app/environments/environment';
import { JwtService } from '@core/services/auth/jwt.service';
import { RegisterCredentials } from '@core/interfaces/auth/register-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}

  login(credentials: LoginCredentials): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(environment.apiUrl + '/auth/login', credentials)
      .pipe(tap((response: JwtResponse) => this.handleSetTokens(response)));
  }

  register(credentials: RegisterCredentials): Observable<{}> {
    return this.http.post<{}>(environment.apiUrl + '/auth/register', credentials);
  }

  private handleSetTokens(jwtResponse: JwtResponse) {
    this.jwtService.setAccessToken(jwtResponse.accessToken);
    this.jwtService.setRefreshToken(jwtResponse.refreshToken);
  }
}
