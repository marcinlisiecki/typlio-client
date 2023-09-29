import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@app/features/auth/login-form/login-form.component';
import { RegisterFormComponent } from '@app/features/auth/register-form/register-form.component';
import { ForgotPasswordComponent } from '@app/features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@app/features/auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { isNotAuthGuard } from '@core/guards/auth/is-not-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [isNotAuthGuard] },
  { path: 'register', component: RegisterFormComponent, canActivate: [isNotAuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [isNotAuthGuard] },
  { path: 'forgot-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
