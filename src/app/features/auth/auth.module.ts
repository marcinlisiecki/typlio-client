import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, CardModule, InputTextModule, PasswordModule, ButtonModule, SharedModule],
})
export class AuthModule {}
