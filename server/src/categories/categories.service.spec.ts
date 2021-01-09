import { Test } from '@nestjs/testing';
import { AbstractLowdbGetMock, TestData } from '../test';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

const { categories } = TestData.data;

class CategoriesLowDbMockService extends AbstractLowdbGetMock<Category> {
  constructor() {
    super(categories);
  }
}

describe('CategoriesService', () => {
  let service: CategoriesService;
  let lowdbMock: CategoriesLowDbMockService;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    lowdbMock = new CategoriesLowDbMockService();

    jest.spyOn(service['db'], 'get').mockImplementation(() => lowdbMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should create a category with lowercased name', () => {
      expect(service.create({
        id: '10',
        name: 'TEST'
      }).name).toBe('test');
    });

    it('should not create a category with duplicated id', () => {
      expect(() => service.create(categories[0])).toThrowError('Category name should be unique');
    });
  });

  describe('filter', () => {
    it('should return categories by keyword', () => {
      const result: Category[] = service.get({ q: 'cAt' });
      expect(result.length).toBe(2);
    });
  });
});
