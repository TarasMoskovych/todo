import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Operations } from 'src/app/models';

import { AbstractService } from './abstract.service';
import { NotificationService } from './notification.service';

interface Payload {
  id: string;
  name: string;
}

@Injectable()
class BaseService extends AbstractService<Payload> {
  constructor(http: HttpClient, notificationService: NotificationService) {
    super(http, '/api/items', notificationService);
  }
}

const data: Payload[] = Array.from({ length: 5 }, (v, i) => {
  return {
    id: String(i),
    name: String(i),
  };
});

const item: Payload = { id: '10', name: 'test' };

describe('Abstract Service', () => {
  let service: BaseService;
  let httpController: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationSpy = jasmine.createSpyObj('NotificationService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BaseService,
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });

    service = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items', () => {
    service.getAll()
      .subscribe((response: Payload[]) => {
        expect(response).toBeTruthy();
        expect(response.length).toBe(5);
      });

    const req = httpController.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('should create new item', () => {
    service.create(item)
      .subscribe((response: Payload) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(item);
        expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
        expect(notificationSpy.showMessage).toHaveBeenCalledWith(`"${response.name}" was ${Operations.CREATED.toLocaleLowerCase()}!`);
      });

    const req = httpController.expectOne('/api/items');
    expect(req.request.method).toBe('POST');
    req.flush(item);
  });

  it('should update current item', () => {
    const changes = { ...item, name: 'updated' };

    service.update(changes)
      .subscribe((response: Payload) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(changes);
        expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
        expect(notificationSpy.showMessage).toHaveBeenCalledWith(`"${response.name}" was ${Operations.UPDATED.toLocaleLowerCase()}!`);
      });

    const req = httpController.expectOne('/api/items/10');
    expect(req.request.method).toBe('PUT');
    req.flush(changes);
  });

  it('should remove current item', () => {
    service.remove(item)
      .subscribe((response: Payload) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(item);
        expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
        expect(notificationSpy.showMessage).toHaveBeenCalledWith(`"${response.name}" was ${Operations.REMOVED.toLocaleLowerCase()}!`);
      });

      const req = httpController.expectOne('/api/items/10');
      expect(req.request.method).toBe('DELETE');
      req.flush(item);
  });

  describe('invalid response', () => {
    const defaultMessage = 'Error during request';
    const message = 'The error is occurred during request to the service';
    const response = {
      status: 500,
      statusText: 'Internal server error',
    };

    it('should throw an error during getting items', () => {
      service.getAll()
        .subscribe(
          () => fail('should fail'),
          (e: HttpErrorResponse) => {
            expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
            expect(notificationSpy.showMessage).toHaveBeenCalledWith(e.message);
          },
        );

      const req = httpController.expectOne('/api/items');
      expect(req.request.method).toBe('GET');
      req.flush({ message }, { ...response });
    });

    it('should throw an error during creating item', () => {
      service.create(item)
        .subscribe(
          () => fail('should fail'),
          (e: HttpErrorResponse) => {
            expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
            expect(notificationSpy.showMessage).toHaveBeenCalledWith(defaultMessage);
          },
        );

      const req = httpController.expectOne('/api/items');
      expect(req.request.method).toBe('POST');
      req.flush(null, { ...response });
    });

    it('should throw an error during updating the item', () => {
      service.update(item)
        .subscribe(
          () => fail('should fail'),
          (e: HttpErrorResponse) => {
            expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
            expect(notificationSpy.showMessage).toHaveBeenCalledWith(defaultMessage);
          },
        );

      const req = httpController.expectOne(`/api/items/${item.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(null, { ...response });
    });

    it('should throw an error during deleting the item', () => {
      service.remove(item)
        .subscribe(
          () => fail('should fail'),
          () => {
            expect(notificationSpy.showMessage).toHaveBeenCalledTimes(1);
            expect(notificationSpy.showMessage).toHaveBeenCalledWith(message);
          },
        );

      const req = httpController.expectOne(`/api/items/${item.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message }, { ...response });
    });
  });
});
