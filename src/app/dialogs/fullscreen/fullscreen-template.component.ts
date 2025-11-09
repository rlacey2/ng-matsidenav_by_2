import { Component } from '@angular/core';

@Component({
  // NB need the h-100 here to put component footer at bottom of view, if missing it moves up
  selector: 'app-fullscreen-template', // NB these classes to maintain response scrolling 
  host: {
    class: 'd-flex flex-column overflow-hidden h-100'
  },
  imports: [],
  templateUrl: './fullscreen-template.component.html',
  styleUrl: './fullscreen-template.component.scss',
  standalone: true
})
export class FullscreenTemplateComponent {


}