import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationService } from './notification.service';
import { PrioritiesService } from './priorities.service';
import { Priority } from 'src/app/models';

describe('PrioritiesService', () => {
  let service: PrioritiesService;
  let httpController: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationSpy = jasmine.createSpyObj('NotificationService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrioritiesService,
        { provide: NotificationService, useValue: notificationSpy }
      ],
    });
    service = TestBed.inject(PrioritiesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create item with lowercased name', () => {
    service.create({ id: '1', name: 'Highest', color: '#fff' })
      .subscribe((priority: Priority) => {
        expect(priority).toBeTruthy();
        expect(priority.name).toBe('highest');
      });

    const req = httpController.expectOne('/api/priorities');
    expect(req.request.method).toBe('POST');
    req.flush({ id: '1', name: 'highest', color: '#fff' });
  });
});
