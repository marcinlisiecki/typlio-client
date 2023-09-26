import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { ActivatedRoute } from '@angular/router';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-speed-test-results',
  templateUrl: './speed-test-results.component.html',
  styleUrls: ['./speed-test-results.component.scss'],
})
export class SpeedTestResultsComponent {
  @Input({ required: true }) stats!: TypingStats;
  @Input({ required: true }) time!: number;
  @Input({ required: true }) saved!: boolean;
  @Input({ required: true }) savingError!: string | null;
  @Input() isHistorical: boolean = false;

  @Output() nextSpeedTest: EventEmitter<null> = new EventEmitter<null>();
  @Output() repeatSameSpeedTest: EventEmitter<null> = new EventEmitter<null>();

  modeLabel!: string;
  isAuth!: boolean;

  constructor(route: ActivatedRoute, authService: AuthService) {
    const mode: SpeedTestMode = route.snapshot.params['mode'];
    this.modeLabel = speedTestModeToLabel[mode];
    this.isAuth = authService.isAuth();
  }

  protected readonly Math = Math;
}
