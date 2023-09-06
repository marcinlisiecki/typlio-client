import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@core/constants/cookies';
import { AccessTokenPayload } from '@core/interfaces/auth/access-token-payload';
import { RefreshTokenPayload } from '@core/interfaces/auth/refresh-token-payload';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private cookiesService: CookieService) {}

  getAccessToken() {
    return this.cookiesService.get(ACCESS_TOKEN_COOKIE);
  }

  getRefreshToken() {
    return this.cookiesService.get(REFRESH_TOKEN_COOKIE);
  }

  setAccessToken(token: string) {
    this.cookiesService.put(ACCESS_TOKEN_COOKIE, token);
  }

  setRefreshToken(token: string) {
    this.cookiesService.put(REFRESH_TOKEN_COOKIE, token);
  }

  removeAccessToken() {
    this.cookiesService.remove(ACCESS_TOKEN_COOKIE);
  }

  removeRefreshToken() {
    this.cookiesService.remove(REFRESH_TOKEN_COOKIE);
  }

  getDecodedAccessToken(): AccessTokenPayload | null {
    const token: string | undefined = this.getAccessToken();
    if (!token) {
      return null;
    }

    return jwtDecode<AccessTokenPayload>(token);
  }

  getDecodedRefreshToken(): RefreshTokenPayload | null {
    const token: string | undefined = this.getRefreshToken();
    if (!token) {
      return null;
    }

    return jwtDecode<RefreshTokenPayload>(token);
  }

  getUsername(): string | null {
    return this.getDecodedAccessToken()?.sub || null;
  }

  getEmail(): string | null {
    return this.getDecodedAccessToken()?.email || null;
  }

  getId(): number | null {
    return this.getDecodedAccessToken()?.id || null;
  }

  getAccessTokenExpiration(): number | null {
    return this.getDecodedAccessToken()?.exp || null;
  }

  getRefreshTokenExpiration(): number | null {
    return this.getDecodedRefreshToken()?.exp || null;
  }

  isAccessTokenExpired() {
    if (this.getAccessTokenExpiration() === null) {
      return true;
    }

    return (this.getAccessTokenExpiration() as number) < Date.now() / 1000;
  }

  isRefreshTokenExpired(): boolean {
    if (this.getRefreshTokenExpiration() === null) {
      return true;
    }

    return (this.getRefreshTokenExpiration() as number) < Date.now() / 1000;
  }

  isTokenValid(): boolean {
    return !this.isRefreshTokenExpired();
  }
}
