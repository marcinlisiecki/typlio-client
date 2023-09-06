import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { LoginCredentials } from '@core/interfaces/auth/login-credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/apiErrors';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  apiError: string | null = null;
  isLoading: boolean = false;

  registered: boolean = false;
  queryParamsSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.queryParamsSub = this.route.queryParams.subscribe({
      next: (params) => {
        this.registered = params['registered'];
      },
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub?.unsubscribe();
  }

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
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.apiError = extractMessage(err);
        this.isLoading = false;
      },
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
