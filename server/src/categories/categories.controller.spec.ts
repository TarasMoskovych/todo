import { Test } from '@nestjs/testing';
import { mockService, TestData } from '../test';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

const { categories } = TestData.data;

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      providers: [
        CategoriesController,
        { provide: CategoriesService, useFactory: mockService },
      ]
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should create', () => {
    expect(controller).toBeTruthy();
  });

  it('should get items', () => {
    (service.get as jest.Mock).mockReturnValue(categories);
    const result: Category[] = controller.get(null);

    expect(result).toEqual(categories);
    expect(service.get).toHaveBeenCalled();
  });

  it('should get item by id', () => {
    (service.getById as jest.Mock).mockReturnValue(categories[0]);
    const result: Category = controller.getById(categories[0].id);

    expect(result).toEqual(categories[0]);
    expect(service.getById).toHaveBeenCalled();
  });

  it('should create item', () => {
    (service.create as jest.Mock).mockReturnValue(categories[0]);
    const result: Category = controller.create(categories[0]);

    expect(result).toEqual(categories[0]);
    expect(service.create).toHaveBeenCalled();
  });

  it('should update item', () => {
    (service.update as jest.Mock).mockReturnValue(categories[0]);
    const result: Category = controller.update(categories[0].id, categories[0]);

    expect(result).toEqual(categories[0]);
    expect(service.update).toHaveBeenCalled();
  });

  it('should delete item', () => {
    (service.delete as jest.Mock).mockReturnValue(categories[0]);
    const result: Category = controller.delete(categories[0].id);

    expect(result).toEqual(categories[0]);
    expect(service.delete).toHaveBeenCalled();
  });
});
