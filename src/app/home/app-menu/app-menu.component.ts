import { Component, Input } from '@angular/core';

// types
import { AppMenuTab } from 'src/app/types';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  @Input() activeTab: AppMenuTab = AppMenuTab.None;
}