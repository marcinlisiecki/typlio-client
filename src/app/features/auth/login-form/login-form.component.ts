import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { LoginCredentials } from '@core/interfaces/auth/login-credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/apiErrors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  apiError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.apiError = null;

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const loginCredentials: LoginCredentials = {
      username: this.username?.value || '',
      password: this.password?.value || '',
    };

    this.authService.login(loginCredentials).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.apiError = extractMessage(err);
      },
    });

    this.isLoading = false;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
