import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '@core/interfaces/auth/login-credentials';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { JwtResponse } from '@core/interfaces/auth/jwt-response';
import { environment } from '@app/environments/environment';
import { JwtService } from '@core/services/auth/jwt.service';
import { RegisterCredentials } from '@core/interfaces/auth/register-credentials';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private authSubject!: Subject<boolean>;
  routerEventsSub?: Subscription;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.authSubject = new Subject<boolean>();
    this.authSubject.next(this.isAuth());

    this.routerEventsSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.authSubject.next(this.isAuth());
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }

  login(credentials: LoginCredentials): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(environment.apiUrl + '/auth/login', credentials)
      .pipe(tap((response: JwtResponse) => this.handleSetTokens(response)));
  }

  register(credentials: RegisterCredentials): Observable<{}> {
    return this.http.post<{}>(environment.apiUrl + '/auth/register', credentials);
  }

  refreshToken(): Observable<JwtResponse> {
    const refreshToken = this.jwtService.getRefreshToken();

    return this.http
      .post<JwtResponse>(
        environment.apiUrl + '/auth/refresh-token',
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      )
      .pipe(tap((response: JwtResponse) => this.handleSetTokens(response)));
  }

  logout() {
    this.jwtService.removeAccessToken();
    this.jwtService.removeRefreshToken();
    this.authSubject.next(false);
    this.router.navigateByUrl('/').then();
  }

  getId(): number | null {
    return this.jwtService.getId();
  }

  isAuthObservable(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  isAuth(): boolean {
    return this.jwtService.isTokenValid();
  }

  private handleSetTokens(jwtResponse: JwtResponse) {
    this.jwtService.setAccessToken(jwtResponse.accessToken);
    this.jwtService.setRefreshToken(jwtResponse.refreshToken);
    this.authSubject.next(this.isAuth());
  }
}
