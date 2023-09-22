import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedTestModeSelectorComponent } from './speed-test-mode-selector/speed-test-mode-selector.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '@app/shared/shared.module';
import { SpeedTestComponent } from './speed-test.component';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { SpeedTestStatsComponent } from './speed-test-stats/speed-test-stats.component';
import { SpeedTestTextComponent } from './speed-test-text/speed-test-text.component';
import { SpeedTestResultsComponent } from './speed-test-results/speed-test-results.component';
import { NgChartsModule } from 'ng2-charts';
import { SpinnerModule } from 'primeng/spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    SpeedTestModeSelectorComponent,
    SpeedTestComponent,
    SpeedTestStatsComponent,
    SpeedTestTextComponent,
    SpeedTestResultsComponent,
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    SharedModule,
    RouterLink,
    MessagesModule,
    SharedModule,
    PrimeSharedModule,
    NgChartsModule,
    SpinnerModule,
    ProgressSpinnerModule,
  ],
})
export class SpeedTestModule {}
