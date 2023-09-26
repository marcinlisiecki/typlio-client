import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '@core/services/auth/forgot-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  requestPasswordResetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isLoading: boolean = false;
  success: boolean = false;
  apiError: string | null = null;

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  onSubmit() {
    this.apiError = null;

    if (!this.requestPasswordResetForm.valid) {
      this.requestPasswordResetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.forgotPasswordService.requestResetPasswordLink(this.email?.value || '').subscribe({
      next: () => {
        this.success = true;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.apiError = extractMessage(err);
        this.isLoading = false;
      },
    });
  }

  get email() {
    return this.requestPasswordResetForm.get('email');
  }
}
