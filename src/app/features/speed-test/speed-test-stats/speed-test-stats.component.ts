import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { DEFAULT_TYPING_STATS } from '@core/constants/typing/typing';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-speed-test-stats',
  templateUrl: './speed-test-stats.component.html',
  styleUrls: ['./speed-test-stats.component.scss'],
})
export class SpeedTestStatsComponent implements OnInit, OnDestroy {
  timeModeFinish?: number;
  paramsSub?: Subscription;

  @Input() time: number = 0;
  @Input() stats: TypingStats = DEFAULT_TYPING_STATS;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const mode = params['mode'];

      if (mode.includes('TIME')) {
        this.timeModeFinish = parseInt(mode.replace('TIME_', ''));
      } else {
        this.timeModeFinish = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }
}
