import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-speed-test-basic-stats',
  templateUrl: './speed-test-basic-stats.component.html',
  styleUrls: ['./speed-test-basic-stats.component.scss'],
})
export class SpeedTestBasicStatsComponent {
  @Input({ required: true }) cpm!: number;
  @Input({ required: true }) accuracy!: number;
  @Input({ required: true }) time!: number;

  protected readonly Math = Math;
}
