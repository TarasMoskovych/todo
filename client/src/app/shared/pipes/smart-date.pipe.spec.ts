import { SmartDatePipe } from './smart-date.pipe';

describe('SmartDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SmartDatePipe('en_US');
    expect(pipe).toBeTruthy();
  });
});
