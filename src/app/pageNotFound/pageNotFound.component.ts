import { Component } from '@angular/core';


@Component({
  selector: 'app-page-not-found', // NB these classes to maintain response scrolling
  host: {
    class: 'd-flex flex-column overflow-hidden h-100'
  },
  templateUrl: './pageNotFound.component.html',
  styleUrl: './pageNotFound.component.scss',
  standalone: true,
  imports: [


  ]
})
export class PageNotFoundComponent {

  constructor() {

  }

}
