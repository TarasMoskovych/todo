import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe extends DatePipe implements PipeTransform {

  transform(value: string, format: string = 'mediumDate'): string {
    if (!value) { return '-'; }

    const today = new Date().getDate();
    const date = new Date(value);

    if (date.getDate() === today)     return 'Today';
    if (date.getDate() === today - 1) return 'Yesterday';
    if (date.getDate() === today + 1) return 'Tomorrow';

    return super.transform(date, format);
  }
}
