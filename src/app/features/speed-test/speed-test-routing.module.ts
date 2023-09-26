import { RouterModule, Routes } from '@angular/router';
import { SpeedTestModeSelectorComponent } from '@app/features/speed-test/speed-test-mode-selector/speed-test-mode-selector.component';
import { SpeedTestComponent } from '@app/features/speed-test/speed-test.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SpeedTestModeSelectorComponent,
  },
  {
    path: ':mode',
    component: SpeedTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeedTestRoutingModule {}
