import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeedTest } from '@core/interfaces/typing/speed-test/speed-test';
import { SpeedTestService } from '@core/services/speed-test/speed-test.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@core/interfaces/user/user';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-user-history-details',
  templateUrl: './user-history-details.component.html',
  styleUrls: ['./user-history-details.component.scss'],
})
export class UserHistoryDetailsComponent implements OnInit, OnDestroy {
  speedTest: SpeedTest | null = null;
  user: User | null = null;

  paramsSub?: Subscription;

  userId?: number;
  speedTestId?: number;
  error: string | null = null;

  constructor(
    private speedTestService: SpeedTestService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.speedTestId = params['speedTestId'];
      this.fetchSpeedTest();
      this.fetchUser();
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  fetchUser() {
    this.user = null;

    if (!this.userId) {
      return;
    }

    this.userService.getUser(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.error = extractMessage(err);
      },
    });
  }

  fetchSpeedTest() {
    if (!this.speedTestId || !this.userId) {
      return;
    }

    this.speedTestService.getSpeedTest(this.userId, this.speedTestId).subscribe({
      next: (speedTest: SpeedTest) => {
        this.speedTest = speedTest;
      },
      error: (error: HttpErrorResponse) => {
        this.error = extractMessage(error);
      },
    });
  }
}
