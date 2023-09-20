import { Component, Input } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { DEFAULT_TYPING_STATS } from '@core/constants/typing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-speed-test-stats',
  templateUrl: './speed-test-stats.component.html',
  styleUrls: ['./speed-test-stats.component.scss'],
})
export class SpeedTestStatsComponent {
  timeModeFinish?: number;

  @Input() time: number = 0;
  @Input() stats: TypingStats = DEFAULT_TYPING_STATS;

  constructor(route: ActivatedRoute) {
    const mode = route.snapshot.params['mode'];

    if (mode.includes('TIME')) {
      this.timeModeFinish = parseInt(mode.replace('TIME_', ''));
    }
  }
}
