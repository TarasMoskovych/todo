import { Test } from '@nestjs/testing';
import { AbstractLowdbGetMock } from '../test';
import { AbstractLowDbService } from './abstract.lowdb.service';

interface Payload {
  id: string;
  name: string;
}

const item: Payload = { id: '4', name: '4' };
const items: Payload[] = [
  {
    id: '1',
    name: '1',
  },
  {
    id: '2',
    name: '2',
  },
  {
    id: '3',
    name: '3',
  },
];

class PayloadLowDbMockService extends AbstractLowdbGetMock<Payload> {
  constructor() {
    super([...items]);
  }
}

class TestService extends AbstractLowDbService<Payload> {}

describe('AbstractLowDbService', () => {
  let service: TestService;
  let lowdbMock: PayloadLowDbMockService;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      providers: [TestService],
    }).compile();

    service = module.get<TestService>(TestService);
    lowdbMock = new PayloadLowDbMockService();

    jest.spyOn(service['db'], 'get').mockImplementation(() => lowdbMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return getAll items', () => {
    expect(service.getAll()).toEqual(items);
  });

  describe('getById', () => {
    it('should return item', () => {
      expect(service.getById(items[0].id)).toEqual(items[0]);
    });

    it('should throw error when item does not exist', () => {
      expect(() => service.getById('10')).toThrowError();
    });
  });

  it('should create new item', () => {
    const result: Payload = service.create(item);

    expect(service.getAll().length).toBe(4);
    expect(result.name).toBe(item.name);
  });

  it('should update existed item', () => {
    const updated: Payload = { id: '1', name: 'updated' };
    const result: Payload = service.update(updated.id, updated);

    expect(service.getAll().length).toBe(3);
    expect(service.getAll()[0]).toEqual(updated);
    expect(result).toEqual(updated);
  });

  it('should delete existed item', () => {
    const result: Payload = service.delete(items[0].id);

    expect(service.getAll().length).toBe(2);
    expect(result).toEqual(items[0]);
  });
});
