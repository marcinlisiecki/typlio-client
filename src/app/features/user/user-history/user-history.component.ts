import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeedTestService } from '@core/services/speed-test/speed-test.service';
import { SpeedTest } from '@core/interfaces/speed-test/speed-test';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { User } from '@core/interfaces/user/user';
import { UserService } from '@core/services/user/user.service';
import { first, Subscription } from 'rxjs';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { PagedResponse } from '@core/interfaces/common/paged-response';
import { HISTORY_SPEED_TESTS_PER_PAGE } from '@core/constants/speed-test';
import { SpeedTestHistorySort } from '@core/interfaces/speed-test/speed-test-history-sort';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  paramsSub?: Subscription;

  speedTests: SpeedTest[] | null = null;
  totalSpeedTests: number = 0;
  modes: SpeedTestMode[] = [];
  selectedModes: SpeedTestMode[] = [];
  sortBy: SpeedTestHistorySort = SpeedTestHistorySort.CREATED_AT_DESC;

  userId?: number;
  user: User | null = null;

  error: string | null = null;

  firstSpeedTestIndex: number = 0;
  currentPage: number = 0;

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
      this.fetchModes();
      this.fetchUser();
      this.fetchUserSpeedTests();
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.fetchUserSpeedTests();
  }

  changeSortBy(newSortBy: SpeedTestHistorySort) {
    this.sortBy = newSortBy;
    this.fetchUserSpeedTests();
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

    this.speedTestService
      .getAllUserSpeedTest(this.userId, this.currentPage, HISTORY_SPEED_TESTS_PER_PAGE, this.sortBy)
      .subscribe({
        next: (speedTests: PagedResponse<SpeedTest>) => {
          this.speedTests = speedTests.content;
          this.totalSpeedTests = speedTests.totalItems;
          this.firstSpeedTestIndex = speedTests.currentPage * HISTORY_SPEED_TESTS_PER_PAGE;
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

  protected readonly first = first;
  protected readonly HISTORY_SPEED_TESTS_PER_PAGE = HISTORY_SPEED_TESTS_PER_PAGE;
}
