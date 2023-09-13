import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './features/auth/login-form/login-form.component';
import { RegisterFormComponent } from '@app/features/auth/register-form/register-form.component';
import { SpeedTestModeSelectorComponent } from '@app/features/speed-test/speed-test-mode-selector/speed-test-mode-selector.component';
import { SpeedTestComponent } from '@app/features/speed-test/speed-test/speed-test.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'speed-test',
    component: SpeedTestModeSelectorComponent,
  },
  {
    path: 'speed-test/:mode',
    component: SpeedTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
