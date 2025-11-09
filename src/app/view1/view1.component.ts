import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { LatinComponent } from "../_utility/latin.component";

@Component({
  selector: 'app-status.d-flex.flex-column.overflow-hidden.h-100',
  imports: [ReactiveFormsModule, RouterLink, MatSidenavContainer, MatSidenav, MatRadioGroup, MatRadioButton, MatSidenavContent, LatinComponent],
  templateUrl: './view1.component.html',
  styleUrl: './view1.component.scss',
})
export class View1Component {

  subs: Subscription[] = [];
  mode_default = 'side'

  mode1: FormControl = new FormControl(this.mode_default);  // side over push
  mode2: FormControl = new FormControl(this.mode_default); // side over push


  @ViewChild('matsidenav1') sidenav1!: MatSidenav;
  @ViewChild('matsidenav2') sidenav2!: MatSidenav;
  public observer = inject(BreakpointObserver)

  ngAfterViewInit() {
    //this.sidenav2.position = 'end';
    setTimeout(() => {
      // mode = push | over | side
      //     >       >          >           >          >            > 
      // xs: 0,  sm: 576px, md: 768px,  lg: 992px, xl: 1200px, xxl: 1400px, xxxl: 2560px  
      this.subs.push(
        this.observer.observe(['(max-width: 767px)']).subscribe((res) => {

          console.log(res.matches)
          if (res.matches) { // these are called drawers in error messages
            // xs or sm
            this.sidenav1.mode = 'over';
            this.sidenav2.mode = 'over';
            this.sidenav1.close();
            this.sidenav2.close();
          } else {
            this.sidenav1.mode = 'side'; // side
            this.sidenav2.mode = 'side'; // side
            this.sidenav1.open();
            this.sidenav2.open();
          }
        })
      )
    }, 10)


    this.subs.push(
      this.mode1.valueChanges
        .pipe()
        .subscribe(
          {
            next: v => {
              console.log(v)
              this.mode2.setValue(v, { emitEvent: false }) // make the other one follow, but prevent infinite cascade
            }
          }
        )
    )

    this.subs.push(
      this.mode2.valueChanges
        .pipe()
        .subscribe(
          {
            next: v => {
              console.log(v)
              this.mode1.setValue(v, { emitEvent: false }) // make the other one follow, but prevent infinite cascade
            }
          }
        )
    )

  }

setBothToSameMode() {
  setTimeout(() => {
    

  },1)
}



  toggleSideNav(sideName: string) {
    console.log(sideName)

    switch (sideName) {
      case '#sidenav1':
        console.log(this.sidenav1.mode)
        this.sidenav1.toggle()
        break;
      case '#sidenav2':
        console.log(this.sidenav2.mode)
        this.sidenav2.toggle()
        break;
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed

    this.subs.forEach(sub => sub.unsubscribe());

  }

}
