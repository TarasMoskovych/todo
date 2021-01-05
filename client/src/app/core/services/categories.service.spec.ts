import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoriesService } from './categories.service';
import { NotificationService } from './notification.service';
import { Task } from 'src/app/models';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpController: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationSpy = jasmine.createSpyObj('NotificationService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });
    service = TestBed.inject(CategoriesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item with lowercased name', () => {
    service.create({ id: '1', name: 'Test' })
      .subscribe((task: Task) => {
        expect(task).toBeTruthy();
        expect(task.name).toBe('test');
      });

    const req = httpController.expectOne('/api/categories');
    expect(req.request.method).toBe('POST');
    req.flush({ id: '1', name: 'test' });
  });
});
