import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { GenericDialogComponent } from '../dialogs/generic/genericdialog.component';
import { RouterLink } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointService } from '../services/bpo';
import {CdkScrollable} from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { LatinComponent } from "../_utility/latin.component";

@Component({
  selector: 'app-view3', // NB these classes to maintain response scrolling
      host: {
      class:'d-flex flex-column overflow-hidden h-100'
  },
  imports: [RouterLink, MatSidenavContainer, MatSidenav, MatSidenavContent, LatinComponent],
  templateUrl: './view3.component.html',
 // styleUrl: './view3.component.scss',
})

export class View3Component {
 
 

  public dialog = inject(MatDialog)
  // outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ layout: string }>;
  private breakpointObserver = inject(BreakpointObserver)
  //  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ layout: string }>; not allowed if selected into a dialog
  bps = inject(BreakpointService)

  @ViewChild('matsidenav1') sidenav1!: MatSidenav;
  @ViewChild('matsidenav2') sidenav2!: MatSidenav;

  // assuming side until told otherwise
  mode_default = 'side' // prevents button flicker in and out on larger devices 
  sidenav_mode: string = "side"; // store whether side || over || slide
  currentState: string = 'Idle';
  private destroy$ = new Subject<void>(); // use as takeUntil flag

  subs: Subscription[] = [];

  public myBreakpoints: any = {
    xs: "(max-width: 565px)",
    sm: "(min-width: 566px) and (max-width: 767px)",
    md: "(min-width: 768px) and (max-width: 991px)",
    lg: "(min-width: 992px) and (max-width: 1199px)",
    xl: "(min-width: 1200px)"
  };


  currentBreakpoint: string = ''; // min max string
  currentBreakpointKey: string = ''



  colFitClasses = {
    // xs cols followed by > sm > nd
    /*
    suggested defaults
    xs1sm2md3
    dates and times-in-angular
    string16
    post code 
    
    + cols and size attributes where appropriate
    
     provide as a service, each question type has a default attr to one of these and is resetable by button on cmsadhoc
    
    ahdoc-container  on its own horizontal
    right		ms-auto forces right for any cell 
    left 	    me-auto
    centre      ms-auto me-auto
    
    n cells on same horizontal centred with ms-auto on first and me-auto on last
    
    */

    // hr_* only relevant when working independently due to a wrap
    hr_start: "me-auto",
    hr_end: "ms-auto",
    hr_center: "ms-auto me-auto",

    xs1sm1: "col-12 ",
    xs2sm4: "col-6 col-sm-3 ",
    xs1sm2: "col-12 col-sm-6 ",
    xs1sm2md3: "col-12 col-sm-6 col-md-4",
    xs1sm3: "col-12 col-sm-4",

  }

  //readonly breakpoint$;

  outletDataStatic: any

  
  constructor() {
    // this.outletDataStatic = this.outletData()
    //  console.log('outletData ', this.outletData()) // not working when called by selector into dialog

    //  this.bpNative = this.bps.breakpointNative()

  }

  ngOnInit(): void {
    //  this.breakpoint$.subscribe(() => this.breakpointChanged());
 
  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.breakpointObserver
        .observe([
          this.myBreakpoints.xs,
          this.myBreakpoints.sm,
          this.myBreakpoints.md,
          this.myBreakpoints.lg,
          this.myBreakpoints.xl,
          //'(min-width: 992px)', '(max-width: 991.98px)'
        ])
        .pipe(
          // switchMap is used to switch to a new inner observable when the outer observable emits
          // In this case, when the breakpoint changes
          switchMap((state: BreakpointState) => this.handleBreakpointChange(state)),
          takeUntil(this.destroy$)
        )
        .subscribe(
          {
            next: (newState) => {
              this.currentState = newState;
              console.log(`Current state: ${newState}`)
              this.setUIStateBasedOnBreakpoint();
            },

            error: (error) => console.error('Error observing breakpoints:', error)
          }
        )

    }, 10);
  }


  handleBreakpointChange(state: BreakpointState): Observable<string> {
    // This function returns a new observable for each breakpoint and is the switchMap will subscribe to it.
    console.log('handleBreakpointChange ', state)

    for (const key in this.myBreakpoints) {

      const bp = this.myBreakpoints[key];

      console.log(bp)

      if (state.breakpoints[bp] === true) {
        this.currentBreakpoint = bp;
        this.currentBreakpointKey = key

        return new Observable((observer) => {
          console.log('new breakpoint logic...');
          observer.next(key);
          observer.complete();
        });

      }

    }

    // default return observable
    return new Observable((observer) => {
      console.log('new breakpoint logic...');
      observer.next('xs'); // assume smallest
      observer.complete();
    });

  }


  setUIStateBasedOnBreakpoint() {
    console.log('setUIStateBasedOnBreakpoint')
    switch (this.currentBreakpointKey) {
      case "xs":
      case "sm":
      case "md":
        // over places a shaded backdrop to behave like a dialog
        // over || slide 
        this.toggle_msn_mode_bothsides('slide', false); // move the matSideNavs out of view
        break;
      default:
        this.toggle_msn_mode_bothsides('side', true);
    }
  }

  toggle_msn_mode_bothsides(mode: any, state: boolean) {
    this.sidenav_mode = mode;

    // dialog eror here
    this.sidenav1.mode = mode;
    this.sidenav2.mode = mode;

    if (state) {
      this.sidenav1.open();
      this.sidenav2.open();
    } else {
      this.sidenav1.close();
      this.sidenav2.close();
    }
  }

  toggle_msn_single(x: MatSidenav) {
    if (x.opened) {
      x.close();
    }
    else {
      x.open()
    }

  }


  openDialog() {

    /*
     Fullscreen dialog with  margins
     */
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      height: "calc(100% - 15px)",
      width: "calc(100% - 15px)",
      maxWidth: "100%",
      maxHeight: "100%",
      disableClose: true, // only the cancel button closes the dialog when true
      //   panelClass: 'bg-danger'
      data: { height: "calc(100% - 15px)", title: 'SOME TITLE' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subs.forEach(sub => sub.unsubscribe());
  }






}
