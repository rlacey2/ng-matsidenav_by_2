
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogClose} from '@angular/material/dialog';
 
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 

@Component({
  // NB need the h-100 here to put component footer at bottom of view, if missing it moves up
  selector: 'app-genericdialog.d-flex.flex-column.overflow-hidden.h-100', 
  imports: [MatDialogClose, MatButtonModule],
  standalone: true,
  templateUrl: './genericdialog.component.html',
  styleUrl: './genericdialog.component.scss',
})
export class GenericDialogComponent {
 
 
}