// https://advenage.com/topics/simple-break-point-observation-with-angular-material

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';


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

