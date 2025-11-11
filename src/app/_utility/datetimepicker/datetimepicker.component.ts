//   https://stackblitz.com/edit/demo-ngx-mat-datetime-picker?file=src%2Fapp%2Fapp.component.ts
 /*
This is normalised, each time a date and/or time is required, use this component
hence a future change gets made here
 */

import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Component, OnInit, Input, input, output, OnDestroy } from '@angular/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import * as _moment from 'moment';

import { FormControl, ValueChangeEvent  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
 
import { OwlDateTimeModule  , OwlNativeDateTimeModule} from '@danielmoncada/angular-datetime-picker'
 
const moment = _moment; // _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
 
@Component({ // https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker
 
  selector: 'datetimepicker', //  >datetimepicker< <datetimepicker> </datetimepicker></datetimepicker>    <datetimepicker></datetimepicker></datetimepicker>
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

 //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
       OwlDateTimeModule  , OwlNativeDateTimeModule
    ],
})

export class DateTimePickerComponent implements OnInit, OnDestroy { // DEPRECATED FOR NOW

  @Input() parentFG:any // 

  type = input<string>()      // signal
  classes = input<string>()   // signal
  label = input<string>()     // signal
  fieldName = input< any>() // signal

  dateTimeChange = output<string>()      // optional to call method on the parent


  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public color: ThemePalette = 'primary';


  subs: Subscription[] = [];
  
  constructor() { }

  ngOnInit() {

 
    this.subs.push(

      this.parentFG.get( this.fieldName()).events.pipe(
        filter(event => event instanceof ValueChangeEvent),
        debounceTime(500),
        distinctUntilChanged())
        .subscribe((event: ValueChangeEvent<Event>) => {
          console.log('DateTimePickerComponent ' , event.value)
          this.dateTimeChange.emit(this.parentFG.get(this.fieldName()).value); // inform any listening parent, may not be used if part of bigger catch at form level etc
        })
    )
 
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

 
}
