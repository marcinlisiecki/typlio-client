import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces/user/user';
import { environment } from '@app/environments/environment';
import { MeUser } from '@core/interfaces/user/me-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/users/${userId}`);
  }

  getMe(): Observable<MeUser> {
    return this.http.get<MeUser>(environment.apiUrl + '/users/me');
  }
}
