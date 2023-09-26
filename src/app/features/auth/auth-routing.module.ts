import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@app/features/auth/login-form/login-form.component';
import { RegisterFormComponent } from '@app/features/auth/register-form/register-form.component';
import { ForgotPasswordComponent } from '@app/features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@app/features/auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
