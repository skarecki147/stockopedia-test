import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common'

@Pipe({
  name: 'currencyWithSign'
})
export class CurrencyWithSign extends CurrencyPipe implements PipeTransform {
  transform(
    value: number | string,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string): any {

    const result = super.transform(Math.abs(+value), currencyCode, display, digitsInfo, locale);

    if (+value === 0) {
      return result;
    } else {
      return +value > 0 ? `+${result}` : `-${result}`
    }
  }
}