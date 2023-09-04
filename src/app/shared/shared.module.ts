import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [LogoComponent],
  exports: [LogoComponent],
  imports: [CommonModule, RouterLink],
})
export class SharedModule {}
