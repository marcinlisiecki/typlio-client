import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHistoryComponent } from './user-history/user-history.component';
import { SharedModule } from '@app/shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { UserHistoryFiltersComponent } from './user-history/user-history-filters/user-history-filters.component';
import { UserHistoryItemComponent } from './user-history/user-history-item/user-history-item.component';
import { UserRoutingModule } from '@app/features/user/user-routing.module';
import { UserHistoryDetailsComponent } from './user-history/user-history-details/user-history-details.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { UserSettingsAccountComponent } from './user-settings/user-settings-account/user-settings-account.component';
import { UserSettingsPasswordComponent } from './user-settings/user-settings-password/user-settings-password.component';
import { UserSettingsDeleteComponent } from './user-settings/user-settings-delete/user-settings-delete.component';
import { UserSettingsSectionComponent } from './user-settings/user-settings-section/user-settings-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    UserHistoryComponent,
    UserHistoryFiltersComponent,
    UserHistoryItemComponent,
    UserHistoryDetailsComponent,
    UserSettingsComponent,
    UserSettingsAccountComponent,
    UserSettingsPasswordComponent,
    UserSettingsDeleteComponent,
    UserSettingsSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SkeletonModule,
    DropdownModule,
    PaginatorModule,
    BadgeModule,
    ButtonModule,
    CheckboxModule,
    UserRoutingModule,
    InputTextModule,
    AvatarModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
})
export class UserModule {}
