import { AbstractLowdbGetMock } from './lowdb.mock-service';

interface Payload {
  id: string;
  name: string;
}

class LowdbGetMock extends AbstractLowdbGetMock<Payload> {
  constructor() {
    super([]);
  }
}

describe('AbstractLowdbGetMock', () => {
  let service: LowdbGetMock;

  beforeEach(() => {
    service = new LowdbGetMock();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array', () => {
    expect((service.value() as Payload[]).length).toBe(0);
  });

  it('should add new item', () => {
    service.push({ id: '1', name: 'test' }).write();
    expect((service.value() as Payload[]).length).toBe(1);
  });

  it('should get the item', () => {
    service.push({ id: '1', name: 'test' }).push({ id: '2', name: 'test2' });
    expect((service.find({ id: '1' })).value()).toEqual({ id: '1', name: 'test' });
  });

  it('should return null when item does not exist', () => {
    service.push({ id: '1', name: 'test' });
    expect((service.find({ id: '2' })).value()).toBeNull();
  });

  it('should update the item', () => {
    service.push({ id: '1', name: 'test' });
    expect((service.assign({ id: '1', name: 'test2' })).value()).toEqual([{ id: '1', name: 'test2' }]);
  });

  it('should not update the item', () => {
    service.push({ id: '1', name: 'test' });
    expect((service.assign({ id: '2', name: 'test2' })).value()).toEqual([{ id: '1', name: 'test' }]);
  });

  it('should remove the item', () => {
    service.push({ id: '1', name: 'test' });
    expect((service.remove({ id: '1' })).value()).toEqual([]);
  });

  it('should not remove the item', () => {
    service.push({ id: '1', name: 'test' });
    expect((service.remove({ id: '2' })).value()).toEqual([{ id: '1', name: 'test' }]);
  });
});
