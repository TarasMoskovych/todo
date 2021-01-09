import { Test } from '@nestjs/testing';
import { AbstractLowdbGetMock, TestData } from '../test';
import { PrioritiesService } from './priorities.service';
import { Priority } from './priority.model';

const { priorities } = TestData.data;

class PrioritiesLowDbMockService extends AbstractLowdbGetMock<Priority> {
  constructor() {
    super(priorities);
  }
}

describe('PrioritiesService', () => {
  let service: PrioritiesService;
  let lowdbMock: PrioritiesLowDbMockService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrioritiesService],
    }).compile();

    service = module.get<PrioritiesService>(PrioritiesService);
    lowdbMock = new PrioritiesLowDbMockService();

    jest.spyOn(service['db'], 'get').mockImplementation(() => lowdbMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should create a priority with lowercased name', () => {
      expect(service.create({
        id: '10',
        name: 'TEST',
        color: '#fff',
      }).name).toBe('test');
    });

    it('should not create a priority with duplicated id', () => {
      expect(() => service.create(priorities[0])).toThrowError('Priority name should be unique');
    });
  });
});
