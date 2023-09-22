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

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  paramsSub?: Subscription;

  speedTests: SpeedTest[] | null = null;
  speedTestsError: string | null = null;
  modes: SpeedTestMode[] = [];
  selectedModes: SpeedTestMode[] = [];

  userId?: number;
  user: User | null = null;
  userError: string | null = null;

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

      this.fetchUser();
      this.fetchUserSpeedTests();
      this.fetchModes();
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  fetchUser() {
    this.userError = null;
    this.user = null;

    if (!this.userId) {
      return;
    }

    this.userService.getUser(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.userError = extractMessage(err);
      },
    });
  }

  fetchUserSpeedTests() {
    this.speedTests = null;
    this.speedTestsError = null;

    if (!this.userId) {
      return;
    }

    this.speedTestService.getAllUserSpeedTest(this.userId).subscribe({
      next: (speedTests: SpeedTest[]) => {
        this.speedTests = speedTests;
      },
      error: (err: HttpErrorResponse) => {
        this.speedTestsError = extractMessage(err);
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
        console.log(err);
      },
    });
  }

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
}
