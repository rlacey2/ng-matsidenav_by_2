
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";

import { Observable, Subject, Subscription } from 'rxjs';

import { RouterLink } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';


import { CdkScrollable } from '@angular/cdk/scrolling';

import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LatinComponent } from '../../_utility/latin.component';
import { BreakpointService } from '../../services/bpo';
import { SafePipe } from '../../pipes/safe-pipe';
import { StatusComponent} from '../../status/status.component'



//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  // NB need the h-100 here to put component footer at bottom of view, if missing it moves up
  selector: 'app-genericdialog', // NB these classes to maintain response scrolling
        host: {
      class:'d-flex flex-column overflow-hidden h-100'
  },
  imports: [MatDialogClose, MatButtonModule, SafePipe, StatusComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, LatinComponent],
  standalone: true,
  templateUrl: './genericdialog.component.html',
  styleUrl: './genericdialog.component.scss',
})
export class GenericDialogComponent {


  private dialogRef = inject(MatDialogRef<GenericDialogComponent>)
  public readonly data: any = inject(MAT_DIALOG_DATA)

  public dialog = inject(MatDialog)

  private breakpointObserver = inject(BreakpointObserver)
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
    // xs cols folloed by > sm 

    xs1sm1: "col-12 ",
    xs2sm4: "col-6 col-sm-3 ",
    xs1sm2: "col-12 col-sm-6 ",
    xs1sm3: "col-12 col-sm-4 ",

  }

  BLOCKING_FULL_SCREEN_DIALOG_OPTIONS: any

  constructor() {
    this.BLOCKING_FULL_SCREEN_DIALOG_OPTIONS = this.data
    console.log(this.data)
  }

  resize(w: string) {
    this.dialogRef.updateSize(w, this.BLOCKING_FULL_SCREEN_DIALOG_OPTIONS['height'])
  }

  closeDialogX() {
    this.dialogRef.close({})
  }


  ngOnInit(): void {
    //  this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  ngAfterViewInit() {
  
  }

 

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
