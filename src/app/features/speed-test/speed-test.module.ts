import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedTestModeSelectorComponent } from './speed-test-mode-selector/speed-test-mode-selector.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SpeedTestModeSelectorComponent],
  imports: [CommonModule, SkeletonModule, SharedModule],
})
export class SpeedTestModule {}
