import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { DISPLAY_DATE_FORMAT } from '@core/constants/date';
import { SpeedTest } from '@core/interfaces/typing/speed-test/speed-test';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-history-item',
  templateUrl: './user-history-item.component.html',
  styleUrls: ['./user-history-item.component.scss'],
})
export class UserHistoryItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) speedTest!: SpeedTest;

  paramsSub?: Subscription;
  userId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
