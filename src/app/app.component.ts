import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";
import { HeaderComponent } from './header/header.component';
import { BreakpointService } from './services/bpo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, A11yModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  bps = inject(BreakpointService)

  bpNative = ''
  currentbp : Signal<string> 

  constructor() {

    this.bpNative = this.bps.breakpointNative()

    console.log(this.bpNative)

    this.currentbp  = computed(() => this.bps.breakpointNative());

    effect(() => {
      console.log(`currentbp -->: ${this.currentbp()}`);
    });

  }

}
