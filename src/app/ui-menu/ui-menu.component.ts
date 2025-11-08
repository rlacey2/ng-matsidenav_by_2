import { Component } from '@angular/core';

/*
based on https://stackblitz.com/edit/angular-material-dynamic-nested-menu?file=src%2Fui-menu%2Fui-menu.component.ts,src%2Fmain.ts,src%2Fui-menu%2Fui-menu.component.html,src%2Fui-menu%2Fui-menu.component.css
*/

import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';


export interface SelectableItem {
  value: any;
  name: string;
  children?: SelectableItem[];
}

@Component({
  selector: 'ui-menu',
  imports: [MatMenuModule, CommonModule],
  templateUrl: './ui-menu.component.html',
  styleUrl: './ui-menu.component.scss'
})
 
 
export class UiMenuComponent {
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  @Input() items?: SelectableItem[];
  @Input() classes?: object;
  @Output() selected = new EventEmitter<SelectableItem['value']>();
}
