import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe extends DatePipe implements PipeTransform {

  transform(value: string, format: string = 'mediumDate'): string {
    if (!value) { return '-'; }

    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const tomorrow = moment().add(1, 'day');
    const date = moment(value);

    if      (today.isSame(date, 'day'))     return 'Today';
    else if (yesterday.isSame(date, 'day')) return 'Yesterday';
    else if (tomorrow.isSame(date, 'day'))  return 'Tomorrow';

    return super.transform(date, format);
  }
}
