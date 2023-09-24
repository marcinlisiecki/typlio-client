import { Component, EventEmitter, Input, Output } from '@angular/core';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { SPEED_TEST_HISTORY } from '@core/constants/speed-test-history';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { Sort } from '@core/interfaces/common/sort';
import { SpeedTestHistorySort } from '@core/interfaces/speed-test/speed-test-history-sort';

@Component({
  selector: 'app-user-history-filters',
  templateUrl: './user-history-filters.component.html',
  styleUrls: ['./user-history-filters.component.scss'],
})
export class UserHistoryFiltersComponent {
  @Input() modes: SpeedTestMode[] = [];
  @Input() selectedModes: SpeedTestMode[] = [];
  @Input({ required: true }) sortBy!: SpeedTestHistorySort;

  @Output() changeSortBy: EventEmitter<SpeedTestHistorySort> =
    new EventEmitter<SpeedTestHistorySort>();
  @Output() changeSelectedModes: EventEmitter<SpeedTestMode[]> = new EventEmitter<
    SpeedTestMode[]
  >();

  sortByItems: Sort[] = SPEED_TEST_HISTORY;

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
}
