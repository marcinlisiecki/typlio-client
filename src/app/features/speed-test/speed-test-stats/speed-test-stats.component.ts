import { Component, Input } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { DEFAULT_TYPING_STATS } from '@core/constants/typing';

@Component({
  selector: 'app-speed-test-stats',
  templateUrl: './speed-test-stats.component.html',
  styleUrls: ['./speed-test-stats.component.scss'],
})
export class SpeedTestStatsComponent {
  @Input() time: number = 0;
  @Input() stats: TypingStats = DEFAULT_TYPING_STATS;
}
