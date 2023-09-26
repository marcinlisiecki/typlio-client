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

@NgModule({
  declarations: [UserHistoryComponent, UserHistoryFiltersComponent, UserHistoryItemComponent, UserHistoryDetailsComponent],
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
  ],
})
export class UserModule {}
