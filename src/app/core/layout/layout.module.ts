import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { HeaderNavLinkComponent } from './header/header-nav-link/header-nav-link.component';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, HeaderNavComponent, HeaderNavLinkComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, RouterLink, SharedModule],
})
export class LayoutModule {}
