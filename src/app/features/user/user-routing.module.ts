import { RouterModule, Routes } from '@angular/router';
import { UserHistoryComponent } from '@app/features/user/user-history/user-history.component';
import { NgModule } from '@angular/core';
import { UserHistoryDetailsComponent } from '@app/features/user/user-history/user-history-details/user-history-details.component';
import { UserSettingsComponent } from '@app/features/user/user-settings/user-settings.component';
import { isAuthGuard } from '@core/guards/is-auth/is-auth.guard';
import { isSameUserGuard } from '@core/guards/is-same-user/is-same-user.guard';

const routes: Routes = [
  {
    path: ':userId/history',
    component: UserHistoryComponent,
  },
  {
    path: ':userId/speed-tests/:speedTestId',
    component: UserHistoryDetailsComponent,
  },
  {
    path: ':userId/settings',
    component: UserSettingsComponent,
    canActivate: [isAuthGuard, isSameUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
