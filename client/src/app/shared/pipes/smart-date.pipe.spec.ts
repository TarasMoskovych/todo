import { TestBed } from '@angular/core/testing';
import { SmartDatePipe } from './smart-date.pipe';

describe('SmartDatePipe', () => {
  let pipe: SmartDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartDatePipe],
    });

    pipe = TestBed.inject(SmartDatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Today"', () => {
    const result = pipe.transform(new Date().toISOString());
    expect(result).toBe('Today');
  });

  it('should return "Tomorrow"', () => {
    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    const result = pipe.transform(new Date(tomorrow).toISOString());
    expect(result).toBe('Tomorrow');
  });

  it('should return "Yesterday"', () => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    const result = pipe.transform(new Date(yesterday).toISOString());
    expect(result).toBe('Yesterday');
  });

  it('should return date in "mediumDate" default format', () => {
    const result = pipe.transform('2020-08-17');
    expect(result).toBe('Aug 17, 2020');
  });

  it('should return date in "shortDate" specified format', () => {
    const result = pipe.transform('2020-08-17', 'shortDate');
    expect(result).toBe('8/17/20');
  });

  it('should return dash when no value is specified', () => {
    const result = pipe.transform('');
    expect(result).toBe('-');
  });
});
