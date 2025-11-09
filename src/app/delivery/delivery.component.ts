import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-delivery.d-flex.flex-column.overflow-hidden.h-100', // NB these classes to maintain response scrolling
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule, 
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class DeliveryComponent {
  private fb = inject(FormBuilder);

  hasCourierMessage = false;

  deliveryForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    courierMessage: null,
    city: [null, Validators.required],
    country: [null, Validators.required],
    eircode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    Delivery: ['free', Validators.required]
  });


  

 
  countries = [
    { name: 'France', abbreviation: 'fr' },
    { name: 'Germany', abbreviation: 'de' },
    { name: 'Ireland', abbreviation: 'ie' },
    { name: 'Italy', abbreviation: 'ie' },
    { name: 'Spain', abbreviation: 'es' },
    { name: 'United Kingdom', abbreviation: 'uk' },

  ];

constructor( ) {
  
}

 
 


  onSubmit(): void {
    
    if (this.deliveryForm.invalid) {
      alert('Form Invalid: ideally button would be disabled');
   
    }
    else {
      alert('Logic for API call to server');
    }

   
  }


  /*
  comparisonValidator() : ValidatorFn{
       return (group: FormGroup): ValidationErrors => {
          const control1 = group.controls['myControl1'];
          const control2 = group.controls['myControl2'];
          if (control1.value !== control2.value) {
             control2.setErrors({notEquivalent: true});
          } else {
             control2.setErrors(null);
          }
          return;
    };
 }
*/

}
