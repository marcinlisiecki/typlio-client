import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '@core/interfaces/user/user';
import { environment } from '@app/environments/environment';
import { MeUser } from '@core/interfaces/user/me-user';
import { ChangeUsernameResponse } from '@core/interfaces/user/change-username-response';
import { JwtService } from '@core/services/auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/users/${userId}`);
  }

  getMe(): Observable<MeUser> {
    return this.http.get<MeUser>(environment.apiUrl + '/users/me');
  }

  changeUsername(userId: number, username: string): Observable<ChangeUsernameResponse> {
    return this.http
      .put<ChangeUsernameResponse>(environment.apiUrl + `/users/${userId}/username`, { username })
      .pipe(
        tap((response: ChangeUsernameResponse) => {
          this.jwtService.setRefreshToken(response.refreshToken);
        }),
      );
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<{}> {
    return this.http.put<{}>(environment.apiUrl + `/users/${userId}/password`, {
      oldPassword,
      newPassword,
    });
  }
}
