import { Component, Input } from '@angular/core';
import { MeUser } from '@core/interfaces/user/me-user';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DEFAULT_TOAST_LIFETIME } from '@core/constants/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';

@Component({
  selector: 'app-user-settings-delete',
  templateUrl: './user-settings-delete.component.html',
  styleUrls: ['./user-settings-delete.component.scss'],
})
export class UserSettingsDeleteComponent {
  @Input({ required: true }) user!: MeUser;

  apiError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete your account?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, delete my account',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteAccount();
      },
    });
  }

  deleteAccount() {
    this.isLoading = true;

    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.authService.logout();
        this.messageService.add({
          severity: 'success',
          summary: 'Account successfully deleted',
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
}
