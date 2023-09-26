import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@core/constants/validators';
import { noWhitespaceValidator } from '@core/utils/validators';
import { ForgotPasswordService } from '@core/services/auth/forgot-password.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(PASSWORD_MAX_LENGTH),
      noWhitespaceValidator,
    ]),
  });

  isLoading: boolean = false;
  isSuccess: boolean = false;
  apiError: string | null = null;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private route: ActivatedRoute,
  ) {}

  onSubmit() {
    this.apiError = null;

    if (!this.resetPasswordForm.valid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const token = this.route.snapshot.params['token'];
    const password = this.newPassword?.value || '';

    this.forgotPasswordService.resetPassword(token, password).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isLoading = false;
        this.newPassword?.setValue('');
        this.newPassword?.markAsUntouched();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.apiError = extractMessage(err);
      },
    });

    this.isLoading = true;
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }
}
