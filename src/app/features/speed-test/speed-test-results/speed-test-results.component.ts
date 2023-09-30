import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { KeyHistogram } from '@core/interfaces/typing/key-histogram';

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
  @Input({ required: true }) keyHistogram!: KeyHistogram[];
  @Input() isHistorical: boolean = false;

  @Output() nextSpeedTest: EventEmitter<null> = new EventEmitter<null>();
  @Output() repeatSameSpeedTest: EventEmitter<null> = new EventEmitter<null>();

  mode!: string;
  isAuth!: boolean;

  constructor(route: ActivatedRoute, authService: AuthService) {
    this.mode = route.snapshot.params['mode'];
    this.isAuth = authService.isAuth();
  }

  protected readonly history = history;
}
