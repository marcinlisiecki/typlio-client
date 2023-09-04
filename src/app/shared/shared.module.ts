import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterLink } from '@angular/router';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [LogoComponent, LinkComponent],
  exports: [LogoComponent, LinkComponent],
  imports: [CommonModule, RouterLink],
})
export class SharedModule {}
