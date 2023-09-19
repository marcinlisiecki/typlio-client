import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { ActivatedRoute } from '@angular/router';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';

@Component({
  selector: 'app-speed-test-results',
  templateUrl: './speed-test-results.component.html',
  styleUrls: ['./speed-test-results.component.scss'],
})
export class SpeedTestResultsComponent {
  @Input({ required: true }) stats!: TypingStats;
  @Input({ required: true }) time!: number;

  @Output() nextSpeedTest: EventEmitter<null> = new EventEmitter<null>();
  @Output() repeatSameSpeedTest: EventEmitter<null> = new EventEmitter<null>();

  modeLabel!: string;

  constructor(route: ActivatedRoute) {
    const mode: SpeedTestMode = route.snapshot.params['mode'];
    this.modeLabel = speedTestModeToLabel[mode];
  }

  protected readonly Math = Math;
}
