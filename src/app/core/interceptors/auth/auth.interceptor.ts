import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { JwtService } from '@core/services/auth/jwt.service';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtResponse } from '@core/interfaces/auth/jwt-response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.jwtService.getAccessToken();

    if (accessToken !== undefined && request.headers.get('Authorization') === null) {
      request = this.addTokenHeader(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorized(request, next);
        }

        return throwError(() => error);
      }),
    );
  }

  private handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (this.authService.isAuth()) {
        return this.authService.refreshToken().pipe(
          switchMap((newToken: JwtResponse) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(newToken.accessToken);
            return next.handle(this.addTokenHeader(request, newToken.accessToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.router.navigateByUrl('/login').then();
            return throwError(() => error);
          }),
        );
      } else {
        this.isRefreshing = false;
        this.router.navigateByUrl('/login').then();
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token))),
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
