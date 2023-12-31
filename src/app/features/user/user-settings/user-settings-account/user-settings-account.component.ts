import { Component, Input, OnInit } from '@angular/core';
import { MeUser } from '@core/interfaces/user/me-user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '@core/constants/validators';
import { noWhitespaceValidator } from '@core/utils/validators';
import { UserService } from '@core/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { MessageService } from 'primeng/api';
import { DEFAULT_TOAST_LIFETIME } from '@core/constants/toast';
import { LanguageService } from '@core/services/language/language.service';

@Component({
  selector: 'app-user-settings-account',
  templateUrl: './user-settings-account.component.html',
  styleUrls: ['./user-settings-account.component.scss'],
})
export class UserSettingsAccountComponent implements OnInit {
  @Input({ required: true }) user!: MeUser;

  apiError: string | null = null;
  isSuccess: boolean = false;
  isLoading: boolean = false;

  firstUsernameLetter: string = '';

  accountSettingsForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(USERNAME_MIN_LENGTH),
      Validators.maxLength(USERNAME_MAX_LENGTH),
      noWhitespaceValidator,
    ]),
  });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.firstUsernameLetter = this.user.username[0];
  }

  onSubmit() {
    this.apiError = null;
    this.isSuccess = false;

    if (!this.accountSettingsForm.valid) {
      this.accountSettingsForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.userService.changeUsername(this.user.id, this.username?.value || '').subscribe({
      next: (_) => {
        this.messageService.add({
          severity: 'success',
          summary: this.languageService.instant('user.settings.account.success'),
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

  get username() {
    return this.accountSettingsForm.get('username');
  }
}
