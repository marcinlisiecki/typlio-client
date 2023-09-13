import { Component, OnInit } from '@angular/core';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { SpeedTestService } from '@core/services/speed-test/speed-test.service';
import { speedTestModeToLabel } from '@core/utils/speed-test';

@Component({
  selector: 'app-speed-test-mode-selector',
  templateUrl: './speed-test-mode-selector.component.html',
  styleUrls: ['./speed-test-mode-selector.component.scss'],
})
export class SpeedTestModeSelectorComponent implements OnInit {
  availableSpeedTestModes: SpeedTestMode[] | null = null;

  constructor(private speedTestService: SpeedTestService) {}

  ngOnInit(): void {
    this.fetchAvailableSpeedTestModes();
  }

  fetchAvailableSpeedTestModes() {
    this.speedTestService.getAvailableSpeedTestModes().subscribe({
      next: (modes: SpeedTestMode[]) => {
        this.availableSpeedTestModes = modes;
      },
    });
  }

  protected readonly speedTestModeToLabel = speedTestModeToLabel;
}
