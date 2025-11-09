import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'latin', // <latin></latin></latin>
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './latin.component.html',
  styleUrl: './latin.component.scss'
})

export class LatinComponent {
 
}
