// multiple componenents here

// insure not of these are from ../authenticated to stay on public side
import { Component, OnInit, Input, ChangeDetectionStrategy,  input, output } from '@angular/core';
import { BOOLEAN_OPTIONS, BOOLEAN_OPTIONS_BINARY, BOOLEAN_OPTIONS_YN } from '../constants';
import { FormControl, ValueChangeEvent  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

 
 
@Component({
 
  selector: 'boolean', // <boolean> </boolean> <boolean></boolean></boolean></boolean>
  templateUrl: './boolean.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
        MatSelectModule 
      ],
})

export class BooleanComponent implements OnInit {

/* 20240608 refactoring
 
      <boolean [type]="'TF'" [parentFG]="Adhoc" label="Row Break" [fieldName]="'break'" classes="abs-w-150 me-2">
      </boolean>  
			  	  
			<boolean [type]="'TF'" [parentFG]="cms07_payment_meta_FG" label="Payment Required" [fieldName]="'paymentRequired'" classes="abs-w-180 me-2"
                          (selectionChange)='paymentDefaultSettings($event)'>
      </boolean>  
 
  */
 
 // parentFG: ModelSignal<FormGroup> = model() 
  @Input() parentFG:any // 

  type = input<string>()      // signal
  classes = input<string>()   // signal
  label = input<string>()     // signal
  fieldName = input< any>() // signal

  subscriptSizing = input<any>('dynamic') // signal  99.99% will be dynamic i.e save space

  selectionChange = output<string>()      // optional to pass back to parent

  readonly booleanOptions = BOOLEAN_OPTIONS              // true or false
  readonly booleanOptionsYN = BOOLEAN_OPTIONS_YN         // Yes or No
  readonly booleanOptionsBinary = BOOLEAN_OPTIONS_BINARY // 0 or 1

  constructor() { }

  ngOnInit() {
 
  }

  booleanChanged() { // tell the parent that as change has occurred if it provided a (selectChange)=XXXX()
    //console.log(this.parentFG.get(this.fieldName()).value)
    this.selectionChange.emit(this.parentFG.get(this.fieldName()).value);
  }

}

 