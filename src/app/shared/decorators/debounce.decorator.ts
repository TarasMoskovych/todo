import { debounce } from 'lodash';

export function Debounce(ms: number = 500) {
  return function (target: any, key: any, descriptor: any) {
    const oldFunc = descriptor.value
    const newFunc = debounce(oldFunc, ms);
    descriptor.value = function() {
      return newFunc.apply(this, arguments);
    }
  }
}
