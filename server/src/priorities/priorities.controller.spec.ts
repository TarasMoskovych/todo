import { Test } from '@nestjs/testing';
import { mockService, TestData } from '../test';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { Priority } from './priority.model';

const { priorities } = TestData.data;

describe('PrioritiesController', () => {
  let controller: PrioritiesController;
  let service: PrioritiesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrioritiesController,
        { provide: PrioritiesService, useFactory: mockService },
      ]
    }).compile();

    controller = module.get<PrioritiesController>(PrioritiesController);
    service = module.get<PrioritiesService>(PrioritiesService);
  });

  it('should create', () => {
    expect(controller).toBeTruthy();
  });

  it('should get items', () => {
    (service.getAll as jest.Mock).mockReturnValue(priorities);
    const result: Priority[] = controller.get();

    expect(result).toEqual(priorities);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should get item by id', () => {
    (service.getById as jest.Mock).mockReturnValue(priorities[0]);
    const result: Priority = controller.getById(priorities[0].id);

    expect(result).toEqual(priorities[0]);
    expect(service.getById).toHaveBeenCalled();
  });

  it('should create item', () => {
    (service.create as jest.Mock).mockReturnValue(priorities[0]);
    const result: Priority = controller.create(priorities[0]);

    expect(result).toEqual(priorities[0]);
    expect(service.create).toHaveBeenCalled();
  });

  it('should update item', () => {
    (service.update as jest.Mock).mockReturnValue(priorities[0]);
    const result: Priority = controller.update(priorities[0].id, priorities[0]);

    expect(result).toEqual(priorities[0]);
    expect(service.update).toHaveBeenCalled();
  });

  it('should delete item', () => {
    (service.delete as jest.Mock).mockReturnValue(priorities[0]);
    const result: Priority = controller.delete(priorities[0].id);

    expect(result).toEqual(priorities[0]);
    expect(service.delete).toHaveBeenCalled();
  });
});
