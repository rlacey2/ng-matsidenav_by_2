import { Component } from '@angular/core';

@Component({
  // NB need the h-100 here to put component footer at bottom of view, if missing it moves up
  selector: 'app-blank-template.d-flex.flex-column.overflow-hidden.h-100', 
  imports: [],
  templateUrl: './blank-template.component.html',
  styleUrl: './blank-template.component.scss',
  standalone: true
})
export class BlankTemplateComponent {
 
 
}