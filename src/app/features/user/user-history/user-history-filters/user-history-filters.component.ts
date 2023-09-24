import { Component, Input } from '@angular/core';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { USER_HISTORY_SORT } from '@core/constants/user-history';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { Sort } from '@core/interfaces/common/sort';

@Component({
  selector: 'app-user-history-filters',
  templateUrl: './user-history-filters.component.html',
  styleUrls: ['./user-history-filters.component.scss'],
})
export class UserHistoryFiltersComponent {
  @Input() modes: SpeedTestMode[] = [];
  @Input() selectedModes: SpeedTestMode[] = [];

  sortBy: Sort[] = USER_HISTORY_SORT;

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
}
