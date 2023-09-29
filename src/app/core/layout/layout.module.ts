import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { HeaderNavLinkComponent } from './header/header-nav-link/header-nav-link.component';
import { RouterLink } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule } from '@angular/forms';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SlideMenuModule } from 'primeng/slidemenu';

@NgModule({
  declarations: [HeaderComponent, HeaderNavComponent, HeaderNavLinkComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
    AvatarModule,
    MenuModule,
    DropdownModule,
    StyleClassModule,
    FormsModule,
    TieredMenuModule,
    SlideMenuModule,
    NgOptimizedImage,
  ],
})
export class LayoutModule {}
