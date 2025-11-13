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
import { LatinComponent } from "../_utility/latin.component";

@Component({
  selector: 'app-blankmsc', // NB these classes to maintain response scrolling
      host: {
      class:'d-flex flex-column overflow-hidden h-100'
  },
  imports: [RouterLink, MatSidenavContainer, MatSidenav, MatSidenavContent, LatinComponent],
  templateUrl: './view3.component.html',
 
})

export class BlankmscComponent {
 
 

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
    this.watch_breakPointChange()
  }

  watch_breakPointChange() {
    setTimeout(() => {
      this.subs.push(
        this.bps.bp$.subscribe(
          {
            next: x => {
              console.log('bps.bp$.subscribe ')
              console.log(x)

              this.currentBreakpoint = x['currentBreakpoint'];
              this.currentBreakpointKey = x['newState'] //= x['currentBreakpoint']

              this.bps.setUIStateBasedOnBreakpoint(this.sidenav1, this.sidenav2);
            }
          }
        )
      )
        , 1
    })
  }


  toggle_msn_single(x: MatSidenav) { 
    if (x.opened) {
      x.close();
    }
    else {
      x.open()
    }

  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subs.forEach(sub => sub.unsubscribe());
  }

 
  }
 