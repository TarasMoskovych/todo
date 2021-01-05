import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { NotificationService } from './notification.service';

describe('TasksService', () => {
  let service: TasksService;
  let notificationSpy = jasmine.createSpyObj('NotificationService', ['showMessage']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksService,
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
