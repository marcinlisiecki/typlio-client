import { RouterModule, Routes } from '@angular/router';
import { UserHistoryComponent } from '@app/features/user/user-history/user-history.component';
import { NgModule } from '@angular/core';
import { UserHistoryDetailsComponent } from '@app/features/user/user-history/user-history-details/user-history-details.component';

const routes: Routes = [
  {
    path: ':userId/history',
    component: UserHistoryComponent,
  },
  {
    path: ':userId/speed-tests/:speedTestId',
    component: UserHistoryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
