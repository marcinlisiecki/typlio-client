import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HeroComponent } from './hero/hero.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeroComponent],
  imports: [CommonModule, LandingRoutingModule, ButtonModule, NgOptimizedImage, TranslateModule],
})
export class LandingModule {}
