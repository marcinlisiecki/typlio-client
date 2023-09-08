import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedTestModeSelectorComponent } from './speed-test-mode-selector/speed-test-mode-selector.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [SpeedTestModeSelectorComponent],
  imports: [CommonModule, SkeletonModule],
})
export class SpeedTestModule {}
