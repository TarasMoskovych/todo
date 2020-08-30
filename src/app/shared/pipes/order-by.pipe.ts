import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: any[], order = 'asc', column: string = ''): any {
    if (!arr || order === '' || !order) { return arr; }
    if (arr.length <= 1) { return arr; }
    if (!column || column === '') {
      return order === 'asc' ? arr.sort() : arr.sort().reverse();
    }

    return orderBy(arr, [column], [order]);
  }

}
