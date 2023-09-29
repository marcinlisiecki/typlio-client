import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { SPEED_TEST_HISTORY } from '@core/constants/speed-test-history';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { Sort } from '@core/interfaces/common/sort';
import { SpeedTestHistorySort } from '@core/interfaces/speed-test/speed-test-history-sort';
import { LanguageService } from '@core/services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-history-filters',
  templateUrl: './user-history-filters.component.html',
  styleUrls: ['./user-history-filters.component.scss'],
})
export class UserHistoryFiltersComponent implements OnInit, OnDestroy {
  @Input() modes: SpeedTestMode[] = [];
  @Input() selectedModes: SpeedTestMode[] = [];
  @Input({ required: true }) sortBy!: SpeedTestHistorySort;

  @Output() changeSortBy: EventEmitter<SpeedTestHistorySort> =
    new EventEmitter<SpeedTestHistorySort>();
  @Output() changeSelectedModes: EventEmitter<SpeedTestMode[]> = new EventEmitter<
    SpeedTestMode[]
  >();

  sortByItems: Sort[] = SPEED_TEST_HISTORY;
  sortByItemsTranslated: Sort[] = [];

  langSub?: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.langSub = this.languageService.onLangChange.subscribe(() => this.handleSetSortBy());
    this.handleSetSortBy();
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  handleSetSortBy() {
    this.sortByItemsTranslated = this.sortByItems.map(({ value, label }) => ({
      value,
      label: this.languageService.instant(label),
    }));
  }

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
}
