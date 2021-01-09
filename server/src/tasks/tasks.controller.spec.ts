import { Test } from '@nestjs/testing';
import { mockService, TestData } from '../test';
import { Task } from './task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const { tasks } = TestData.data;

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksController,
        { provide: TasksService, useFactory: mockService },
      ]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should create', () => {
    expect(controller).toBeTruthy();
  });

  it('should get items', () => {
    (service.get as jest.Mock).mockReturnValue(tasks);
    const result: Task[] = controller.get(null);

    expect(result).toEqual(tasks);
    expect(service.get).toHaveBeenCalled();
  });

  it('should get item by id', () => {
    (service.getById as jest.Mock).mockReturnValue(tasks[0]);
    const result: Task = controller.getById(tasks[0].id);

    expect(result).toEqual(tasks[0]);
    expect(service.getById).toHaveBeenCalled();
  });

  it('should create item', () => {
    (service.create as jest.Mock).mockReturnValue(tasks[0]);
    const result: Task = controller.create(tasks[0]);

    expect(result).toEqual(tasks[0]);
    expect(service.create).toHaveBeenCalled();
  });

  it('should update item', () => {
    (service.update as jest.Mock).mockReturnValue(tasks[0]);
    const result: Task = controller.update(tasks[0].id, tasks[0]);

    expect(result).toEqual(tasks[0]);
    expect(service.update).toHaveBeenCalled();
  });

  it('should delete item', () => {
    (service.delete as jest.Mock).mockReturnValue(tasks[0]);
    const result: Task = controller.delete(tasks[0].id);

    expect(result).toEqual(tasks[0]);
    expect(service.delete).toHaveBeenCalled();
  });
});
