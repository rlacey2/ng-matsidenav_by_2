import { Component } from '@angular/core';

@Component({
  // NB need the h-100 here to put component footer at bottom of view, if missing it moves up
  selector: 'app-blank', // NB these classes to maintain response scrolling 
  host: {
    class: 'd-flex flex-column overflow-hidden h-100'
  },
  imports: [],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss',
})
export class BlankComponent {


}