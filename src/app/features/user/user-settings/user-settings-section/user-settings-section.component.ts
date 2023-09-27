import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-settings-section',
  templateUrl: './user-settings-section.component.html',
  styleUrls: ['./user-settings-section.component.scss'],
})
export class UserSettingsSectionComponent {
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subheading!: string;
}
