import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { ActivatedRoute } from '@angular/router';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { ChartConfiguration } from 'chart.js';
import { DEFAULT_DATASET_STYLES, DEFAULT_LINE_CHART_OPTIONS } from '@core/constants/chart';

@Component({
  selector: 'app-speed-test-results',
  templateUrl: './speed-test-results.component.html',
  styleUrls: ['./speed-test-results.component.scss'],
})
export class SpeedTestResultsComponent implements OnInit {
  @Input({ required: true }) stats!: TypingStats;
  @Input({ required: true }) time!: number;
  @Input({ required: true }) saved!: boolean;
  @Input({ required: true }) savingError!: string | null;

  @Output() nextSpeedTest: EventEmitter<null> = new EventEmitter<null>();
  @Output() repeatSameSpeedTest: EventEmitter<null> = new EventEmitter<null>();

  modeLabel!: string;
  chartData: ChartConfiguration<'line'>['data'] | null = null;

  constructor(route: ActivatedRoute) {
    const mode: SpeedTestMode = route.snapshot.params['mode'];
    this.modeLabel = speedTestModeToLabel[mode];
  }

  ngOnInit(): void {
    this.chartData = {
      labels: [...this.stats.wpmHistory.map((_, index) => index + 1)],
      datasets: [
        {
          label: 'wpm',
          data: this.stats.wpmHistory,
          ...DEFAULT_DATASET_STYLES,
        },
      ],
    };
  }

  protected readonly Math = Math;
  protected readonly DEFAULT_LINE_CHART_OPTIONS = DEFAULT_LINE_CHART_OPTIONS;
}
