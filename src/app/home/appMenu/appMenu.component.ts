import { Component, Input, OnInit } from '@angular/core';

// types
import { AppMenuTab } from 'src/app/types/types';

@Component({
  selector: 'app-menu',
  templateUrl: './appMenu.component.html',
  styleUrls: ['./appMenu.component.css']
})
export class AppMenuComponent implements OnInit {
  @Input() activeTab: AppMenuTab = AppMenuTab.None;

  ngOnInit(): void {
    console.log(this.activeTab);
  }
}