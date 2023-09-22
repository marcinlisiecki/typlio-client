import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterLink } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    LogoComponent,
    LinkComponent,
    ValidationErrorComponent,
    IconButtonComponent,
    PageHeadingComponent,
    SpinnerComponent,
  ],
  exports: [
    LogoComponent,
    LinkComponent,
    ValidationErrorComponent,
    IconButtonComponent,
    PageHeadingComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, RouterLink],
})
export class SharedModule {}
