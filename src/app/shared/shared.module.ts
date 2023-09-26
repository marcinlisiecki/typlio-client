import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { RouterLink } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { NgChartsModule } from 'ng2-charts';
import { SpeedTestChartComponent } from './speed-test/speed-test-chart/speed-test-chart.component';
import { SpeedTestBasicStatsComponent } from './speed-test/speed-test-basic-stats/speed-test-basic-stats.component';
import { BackLinkComponent } from './back-link/back-link.component';

@NgModule({
  declarations: [
    LogoComponent,
    LinkComponent,
    ValidationErrorComponent,
    IconButtonComponent,
    PageHeadingComponent,
    SpinnerComponent,
    PageErrorComponent,
    SpeedTestChartComponent,
    SpeedTestBasicStatsComponent,
    BackLinkComponent,
  ],
  exports: [
    LogoComponent,
    LinkComponent,
    ValidationErrorComponent,
    IconButtonComponent,
    PageHeadingComponent,
    SpinnerComponent,
    PageErrorComponent,
    SpeedTestChartComponent,
    SpeedTestBasicStatsComponent,
    BackLinkComponent,
  ],
  imports: [CommonModule, RouterLink, NgChartsModule],
})
export class SharedModule {}
