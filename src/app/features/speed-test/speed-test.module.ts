import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedTestModeSelectorComponent } from './speed-test-mode-selector/speed-test-mode-selector.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '@app/shared/shared.module';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { SharedModule as PrimeSharedModule } from 'primeng/api';

@NgModule({
  declarations: [SpeedTestModeSelectorComponent, SpeedTestComponent],
  imports: [
    CommonModule,
    SkeletonModule,
    SharedModule,
    RouterLink,
    MessagesModule,
    SharedModule,
    PrimeSharedModule,
  ],
})
export class SpeedTestModule {}
