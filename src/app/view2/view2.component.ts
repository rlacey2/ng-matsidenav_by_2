import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LatinComponent } from "../_utility/latin.component";

@Component({
  selector: 'app-view2', // NB these classes to maintain response scrolling
        host: {
      class:'d-flex flex-column overflow-hidden h-100'
  },
  imports: [RouterLink, LatinComponent],
  templateUrl: './view2.component.html',
  styleUrl: './view2.component.scss',
})
export class View2Component {

}
