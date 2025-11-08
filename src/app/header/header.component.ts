import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  private router = inject(Router)
  private readonly document = inject(DOCUMENT);

  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';

  currentTheme = ""  // light

 themeChoice(c: string) {
    console.log(c)

      if ( c === 'dark' ) {
        this.document.documentElement.classList.add('dark');
      }
      else {
        this.document.documentElement.classList.remove('dark');
      }



  }


  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu(target = "") {
    console.log('closeMenu')
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';

    this.router.navigate([target]);



  }
}
