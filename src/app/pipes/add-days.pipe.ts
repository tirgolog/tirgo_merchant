// add-days.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'addDays'
})
export class AddDaysPipe implements PipeTransform {
  transform(value: Date, daysToAdd: number, format: string = 'shortDate'): string {
    const result = new Date(value);
    result.setDate(result.getDate() + daysToAdd);
    return formatDate(result, format, 'en-US');
  }
}
