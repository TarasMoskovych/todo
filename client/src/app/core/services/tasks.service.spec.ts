import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { NotificationService } from './notification.service';

export class NotificationServiceMock {
  showMessage(msg: string) {}
}

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksService,
        { provide: NotificationService, useClass: NotificationServiceMock }
      ],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
