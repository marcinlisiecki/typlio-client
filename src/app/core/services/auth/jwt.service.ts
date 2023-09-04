import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@core/constants/cookies';
import { AccessTokenPayload } from '@core/interfaces/auth/access-token-payload';

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

  getUsername(): string | null {
    return this.getDecodedAccessToken()?.sub || null;
  }

  getEmail(): string | null {
    return this.getDecodedAccessToken()?.email || null;
  }

  getId(): number | null {
    return this.getDecodedAccessToken()?.id || null;
  }

  getExpiration(): number | null {
    return this.getDecodedAccessToken()?.exp || null;
  }

  isTokenExpired() {
    if (this.getExpiration() === null) {
      return true;
    }

    return (this.getExpiration() as number) < Date.now() / 1000;
  }
}
