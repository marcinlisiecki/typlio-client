import { Component, Input } from '@angular/core';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { DISPLAY_DATE_FORMAT } from '@core/constants/date';
import { SpeedTest } from '@core/interfaces/speed-test/speed-test';

@Component({
  selector: 'app-user-history-item',
  templateUrl: './user-history-item.component.html',
  styleUrls: ['./user-history-item.component.scss'],
})
export class UserHistoryItemComponent {
  @Input({ required: true }) speedTest!: SpeedTest;

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
