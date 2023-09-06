import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '@core/utils/validators';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@core/constants/validators';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterCredentials } from '@core/interfaces/auth/register-credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/apiErrors';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(USERNAME_MIN_LENGTH),
      Validators.maxLength(USERNAME_MAX_LENGTH),
      noWhitespaceValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(PASSWORD_MAX_LENGTH),
      noWhitespaceValidator,
    ]),
  });

  apiError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.apiError = null;

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const registerCredentials: RegisterCredentials = {
      username: this.username?.value || '',
      email: this.email?.value || '',
      password: this.password?.value || '',
    };

    this.authService.register(registerCredentials).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.router.navigateByUrl('/login?registered=true');
      },
      error: (err: HttpErrorResponse) => {
        this.apiError = extractMessage(err);
        this.isLoading = false;
      },
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }
}
