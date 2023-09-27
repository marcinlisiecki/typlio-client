import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '@core/utils/validators';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@core/constants/validators';

import { MeUser } from '@core/interfaces/user/me-user';
import { UserService } from '@core/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { DEFAULT_TOAST_LIFETIME } from '@core/constants/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-settings-password',
  templateUrl: './user-settings-password.component.html',
  styleUrls: ['./user-settings-password.component.scss'],
})
export class UserSettingsPasswordComponent {
  @Input({ required: true }) user!: MeUser;

  apiError: string | null = null;
  isLoading: boolean = false;

  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(PASSWORD_MAX_LENGTH),
      noWhitespaceValidator,
    ]),
  });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  onSubmit() {
    this.apiError = null;

    if (!this.changePasswordForm.valid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const oldPasswordValue = this.oldPassword?.value || '';
    const newPasswordValue = this.newPassword?.value || '';

    this.userService.changePassword(this.user.id, oldPasswordValue, newPasswordValue).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Password successfully changed',
          life: DEFAULT_TOAST_LIFETIME,
        });
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.apiError = extractMessage(err);
        this.isLoading = false;
      },
    });
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
}
