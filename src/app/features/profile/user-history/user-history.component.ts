import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeedTestService } from '@core/services/speed-test/speed-test.service';
import { SpeedTest } from '@core/interfaces/speed-test/speed-test';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { User } from '@core/interfaces/user/user';
import { UserService } from '@core/services/user/user.service';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { Subscription } from 'rxjs';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { DISPLAY_DATE_FORMAT } from '@core/constants/date';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  paramsSub?: Subscription;

  speedTests: SpeedTest[] | null = null;
  modes: SpeedTestMode[] = [];
  selectedModes: SpeedTestMode[] = [];

  userId?: number;
  user: User | null = null;

  error: string | null = null;

  constructor(
    private speedTestService: SpeedTestService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.userId = route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.userId = params['userId'];

      this.error = null;
      this.fetchUser();
      this.fetchUserSpeedTests();
      this.fetchModes();
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

  fetchUserSpeedTests() {
    this.speedTests = null;

    if (!this.userId) {
      return;
    }

    this.speedTestService.getAllUserSpeedTest(this.userId).subscribe({
      next: (speedTests: SpeedTest[]) => {
        this.speedTests = speedTests;
      },
      error: (err: HttpErrorResponse) => {
        this.error = extractMessage(err);
      },
    });
  }

  fetchModes() {
    this.speedTestService.getAvailableSpeedTestModes().subscribe({
      next: (modes: SpeedTestMode[]) => {
        this.modes = modes;
        this.selectedModes = modes;
      },
      error: (err: HttpErrorResponse) => {
        this.error = extractMessage(err);
      },
    });
  }

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
