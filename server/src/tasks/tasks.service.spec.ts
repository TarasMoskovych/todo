import { Test } from '@nestjs/testing';
import { Priority } from 'src/priorities/priority.model';
import { AbstractLowdbGetMock, TestData } from '../test';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

const { tasks, priorities } = TestData.data;

class TasksLowDbMockService extends AbstractLowdbGetMock<Task> {
  constructor() {
    super(tasks);
  }
}

describe('TasksService', () => {
  let service: TasksService;
  let lowdbMock: TasksLowDbMockService;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    lowdbMock = new TasksLowDbMockService();

    jest.spyOn(service['db'], 'get').mockImplementation(() => lowdbMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create new task and set completed to false', () => {
    expect(service.create({
      id: '20',
      completed: true,
      name: 'test',
    }).completed).toBe(false);
  });

  describe('filter', () => {
    it('should return completed tasks', () => {
      const result: Task[] = service.get({ completed: 'true' });
      expect(result.length).toBe(tasks.filter((t: Task) => t.completed).length);
    });

    it('should return uncompleted tasks', () => {
      const result: Task[] = service.get({ completed: 'false' });
      expect(result.length).toBe(tasks.filter((t: Task) => !t.completed).length);
    });

    it('should return tasks by keyword', () => {
      const result: Task[] = service.get({ q: 'learn' });
      expect(result).toEqual([tasks.find((t: Task) => t.name.includes('learn'))]);
    });

    it('should return tasks with "low" priority', () => {
      const priority: Priority = priorities.find((p: Priority) => p.name === 'low');
      const result: Task[] = service.get({ priority: priority.id });
      expect(result).toEqual(tasks.filter((t: Task) => t.priority === priority.id));
    });

    it('should return tasks without priority', () => {
      const result: Task[] = service.get({ priority: '0' });
      expect(result).toEqual(tasks.filter((t: Task) => !t.priority));
    });
  });
});
