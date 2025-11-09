import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  standalone:  true,
  name: 'safe', // the part that goes " | safe" inline in html
})
export class SafePipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer) {
  }

  private convertCSS2JS = (css:any) => { // https://greensock.com/forums/topic/14435-convert-css-string-to-object/
    // convert style string to object to use with ngStyle
    if (css === undefined || css === '') { return {}; }
    // console.log(css);
    let frameCSS:string = css.replace(/([\w-.]+)\s*:([^;]+);?/g, '$1:$2,');
    frameCSS = frameCSS.replace(/[, \t]+$/, ''); // .replace(/,+$/, ''); // remove trailing , and spaces at end
    const properties = frameCSS.split(', ');
    const frameCSSObj:any = {};
    properties.forEach(function (property:any) {
      const cssProp = property.split(':');
      const cssKey = cssProp[0]; // .toCamelCase();
      const cssValue = cssProp[1].trim();
      frameCSSObj[cssKey] = cssValue;
    });
    return frameCSSObj;
  }

  transform(value: string = '', type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // console.log('safeStuff');
    switch (type) {
      case 'html': return this._sanitizer.bypassSecurityTrustHtml(value);  //  return this.dom.sanitize(SecurityContext.HTML, value);
      case 'style': return this._sanitizer.bypassSecurityTrustStyle(value);  // single value
      case 'script': return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'styleStrObj': return this.convertCSS2JS(value); // string of properties with ; separator to object for angular 2
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}
