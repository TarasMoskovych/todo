import { TestBed } from '@angular/core/testing';

import { Task, TestData } from 'src/app/models';
import { OrderByPipe } from './order-by.pipe';

const { tasks } = TestData.data;

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const arr = ['B', 'C', 'A'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderByPipe],
    });

    pipe = TestBed.inject(OrderByPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return tasks sorted by "name" in ascending order', () => {
    const result = pipe.transform(tasks, 'asc', 'name');
    expect(result).toEqual(tasks.sort((t1: Task, t2: Task) => t1.name.localeCompare(t2.name)));
  });

  it('should return tasks sorted by "name" in descending order', () => {
    const result = pipe.transform(tasks, 'desc', 'name');
    expect(result).toEqual(tasks.sort((t1: Task, t2: Task) => t2.name.localeCompare(t1.name)));
  });

  it('should return tasks when "column is not specified"', () => {
    const result = pipe.transform(tasks);
    expect(result).toEqual(tasks);
  });

  it('should sort array os strings in ascending order"', () => {
    const result = pipe.transform(arr);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should sort array os strings in descending order"', () => {
    const result = pipe.transform(arr, 'desc');
    expect(result).toEqual(['C', 'B', 'A']);
  });

  it('should return undefined when invalid arguments were passed', () => {
    const result = pipe.transform(undefined, '');
    expect(result).toBeUndefined();
  });
});
