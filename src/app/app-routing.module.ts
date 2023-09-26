import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './features/auth/login-form/login-form.component';
import { RegisterFormComponent } from '@app/features/auth/register-form/register-form.component';
import { SpeedTestModeSelectorComponent } from '@app/features/speed-test/speed-test-mode-selector/speed-test-mode-selector.component';
import { SpeedTestComponent } from '@app/features/speed-test/speed-test.component';
import { UserHistoryComponent } from '@app/features/user/user-history/user-history.component';
import { ForgotPasswordComponent } from '@app/features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@app/features/auth/reset-password/reset-password.component';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'speed-test',
    component: SpeedTestModeSelectorComponent,
  },
  {
    path: 'speed-test/:mode',
    component: SpeedTestComponent,
  },
  {
    path: 'users/:userId/history',
    component: UserHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
