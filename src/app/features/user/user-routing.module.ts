import { RouterModule, Routes } from '@angular/router';
import { UserHistoryComponent } from '@app/features/user/user-history/user-history.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: ':userId/history',
    component: UserHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
