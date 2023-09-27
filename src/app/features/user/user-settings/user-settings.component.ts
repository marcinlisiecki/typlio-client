import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { MeUser } from '@core/interfaces/user/me-user';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  user: MeUser | null = null;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.error = null;

    this.userService.getMe().subscribe({
      next: (user: MeUser) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.error = extractMessage(err);
      },
    });
  }
}
