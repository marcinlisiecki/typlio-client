import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_DATASET_STYLES, DEFAULT_LINE_CHART_OPTIONS } from '@core/constants/typing/chart';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-speed-test-chart',
  templateUrl: './speed-test-chart.component.html',
  styleUrls: ['./speed-test-chart.component.scss'],
})
export class SpeedTestChartComponent implements OnInit {
  @Input() wpmHistory!: number[];
  chartData: ChartConfiguration<'line'>['data'] | null = null;

  constructor() {}

  ngOnInit(): void {
    this.chartData = {
      labels: [...this.wpmHistory.map((_, index) => index + 1)],
      datasets: [
        {
          label: 'wpm',
          data: this.wpmHistory,
          ...DEFAULT_DATASET_STYLES,
        },
      ],
    };
  }

  protected readonly DEFAULT_LINE_CHART_OPTIONS = DEFAULT_LINE_CHART_OPTIONS;
}
