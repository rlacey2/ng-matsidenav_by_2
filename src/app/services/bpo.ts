// https://advenage.com/topics/simple-break-point-observation-with-angular-material

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';


/**
 * The BreakpointService is an Angular service that provides reactive information about the current browser viewport size and device orientation, using Angular CDK's BreakpointObserver and signals.
 * Key features:
 * - Breakpoint Types:
 *   - Breakpoint: Abstracts viewport into 'MOBILE', 'TABLET', or 'DESKTOP'.
 *   - BreakpointNative: Uses Angular Material's native breakpoints ('XSmall', 'Small', 'Medium', 'Large', 'XLarge').
 *   - DeviceOrientation: Indicates 'PORTRAIT' or 'LANDSCAPE'.
 * - Reactive Signals:
 *   - The service uses signals (Signal<T>) to expose the current breakpoint, native breakpoint, and device orientation. These update automatically when the viewport changes.
 * - Breakpoint Detection:
 *   - Internally, it observes a set of breakpoints (including portrait/landscape variants) using BreakpointObserver.
 *   - The computed signals map the observed breakpoints to the custom types.
 * - Usage:
 *   - Components can inject this service and subscribe to its signals to reactively adapt their UI to viewport changes (e.g., show mobile layout, tablet layout, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  /**
   * DI
   */
  #breakpointObserver = inject(BreakpointObserver);



  private bp_source$: BehaviorSubject<any> = new BehaviorSubject({}); //
  bp$ = this.bp_source$.asObservable();
  private destroy$ = new Subject<void>(); // use as takeUntil flag
  subs: Subscription[] = [];

  public myBreakpoints: any = {
    xs: "(max-width: 565px)",
    sm: "(min-width: 566px) and (max-width: 767px)",
    md: "(min-width: 768px) and (max-width: 991px)",
    lg: "(min-width: 992px) and (max-width: 1199px)",
    xl: "(min-width: 1200px)"
  };

  // assuming side until told otherwise
  mode_default = 'side' // prevents button flicker in and out on larger devices 
  sidenav_mode: string = "side"; // store whether side || over || slide
  
  currentBreakpoint: string = ''; // min max string
  currentBreakpointKey: string = ''

  constructor() {

    this.#breakpointObserver
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
       
        takeUntil(this.destroy$),
        distinctUntilChanged(),
         switchMap((state: BreakpointState) => this.handleBreakpointChange(state)),
      )
      .subscribe(
        {
          next: (newState) => {
          //  this.currentState = newState;
            console.log(`bpo Current state: ${newState}`)
            this.bp_source$.next( { newState: newState, currentBreakpoint : this.currentBreakpoint  })

        //    this.setUIStateBasedOnBreakpoint();
          },

          error: (error) => {
             console.error('Error observing breakpoints:', error)
             this.bp_source$.next( { currentState: 'xs' , currentBreakpoint : 'error' })
          }
        }
      )

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

    } // for

    // default return observable
    return new Observable((observer) => {
      console.log('new breakpoint logic...');
      observer.next('xs'); // assume smallest
      observer.complete();
    });

  }


  /*
  a watcher in the component calls these functions
  */
  setUIStateBasedOnBreakpoint(sidenav1: MatSidenav, sidenav2: MatSidenav) {
    console.log('setUIStateBasedOnBreakpoint')
    switch (this.currentBreakpointKey) {
      case "xs":
      case "sm":
      case "md":
        // over places a shaded backdrop to behave like a dialog
        // over || slide 
        this.toggle_msn_mode_bothsides('slide', false,  sidenav1,  sidenav2); // move the matSideNavs out of view
        break;
      default:
        this.toggle_msn_mode_bothsides('side', true,    sidenav1,  sidenav2); 
    }
  }

  toggle_msn_mode_bothsides(mode: any, state: boolean, sidenav1: MatSidenav, sidenav2: MatSidenav) {


    // dialog eror here
    sidenav1.mode = mode;
    sidenav2.mode = mode;

    if (state) {
       sidenav1.open();
       sidenav2.open();
    } else {
       sidenav1.close();
       sidenav2.close();
    }
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subs.forEach(sub => sub.unsubscribe());
  }


  /*
  
  from the web below
  
  */

  /**
   * Private breakpoint state signal
   * - used to create the public breakpoint signal properties
   */
  #breakpointState = toSignal(this.#breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,

    Breakpoints.Handset,
    Breakpoints.Tablet,
    Breakpoints.Web,

    Breakpoints.HandsetPortrait,
    Breakpoints.TabletPortrait,
    Breakpoints.WebPortrait,

    Breakpoints.HandsetLandscape,
    Breakpoints.TabletLandscape,
    Breakpoints.WebLandscape
  ]));

  /**
   * Reactive signal for the current abstracted breakpoint.
   *
   * Possible values:
   * - 'MOBILE': XSmall screens (phones)
   * - 'TABLET': Small screens (tablets)
   * - 'DESKTOP': Medium, Large, or XLarge screens (desktops)
   *
   * Updates automatically when the viewport size changes.
   *
   * @readonly
   */
  readonly breakpoint: Signal<'MOBILE' | 'TABLET' | 'DESKTOP'> = computed(() => {
    const state = this.#breakpointState();
    if (!state) return 'DESKTOP'; // SSR fallback: assume desktop
    if (state?.breakpoints[Breakpoints.Small] === true) { return 'TABLET'; }
    else if (state?.breakpoints[Breakpoints.Medium] === true || state?.breakpoints[Breakpoints.Large] === true || state?.breakpoints[Breakpoints.XLarge] === true) { return 'DESKTOP'; }
    return 'MOBILE';
  });

  /**
   * Reactive signal for the current native breakpoint value.
   *
   * Possible values:
   * - 'XSmall': max-width 599.98px
   * - 'Small': 600px - 959.98px
   * - 'Medium': 960px - 1279.98px
   * - 'Large': 1280px - 1919.98px
   * - 'XLarge': min-width 1920px
   *
   * Updates automatically when the viewport size changes.
   *
   * @readonly
   */

  //     >       >          >           >          >            > 
  // xs: 0,  sm: 576px, md: 768px,  lg: 992px, xl: 1200px, xxl: 1400px, xxxl: 2560px  

  readonly breakpointNative: Signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = computed(() => {
    const state = this.#breakpointState();
    if (!state) return 'xl'; // SSR fallback: assume largest
    if (state?.breakpoints[Breakpoints.Small] === true) { return 'sm'; }
    else if (state?.breakpoints[Breakpoints.Medium] === true) { return 'md'; }
    else if (state?.breakpoints[Breakpoints.Large] === true) { return 'lg'; }
    else if (state?.breakpoints[Breakpoints.XLarge] === true) { return 'xl'; }
    return 'xs';
  });

  /**
   * Reactive signal for the current device orientation.
   *
   * Possible values:
   * - 'PORTRAIT': Device is in portrait mode
   * - 'LANDSCAPE': Device is in landscape mode
   *
   * Updates automatically when the viewport orientation changes.
   *
   * @readonly
   */
  public deviceOrientation: Signal<'PORTRAIT' | 'LANDSCAPE'> = computed(() => {
    const state = this.#breakpointState();
    if (!state) return 'LANDSCAPE'; // SSR fallback: assume landscape
    if (state?.breakpoints[Breakpoints.HandsetLandscape] === true || state?.breakpoints[Breakpoints.TabletLandscape] === true || state?.breakpoints[Breakpoints.WebLandscape] === true) {
      return 'LANDSCAPE';
    }
    return 'PORTRAIT';
  });
}

