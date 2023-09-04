import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-nav-link',
  templateUrl: './header-nav-link.component.html',
  styleUrls: ['./header-nav-link.component.scss'],
})
export class HeaderNavLinkComponent {
  @Input({ required: true }) routerLink!: string;
}
