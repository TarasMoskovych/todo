import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotificationService } from './notification.service';
import { PrioritiesService } from './priorities.service';

export class NotificationServiceMock {
  showMessage(msg: string) {}
}

describe('PrioritiesService', () => {
  let service: PrioritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrioritiesService,
        { provide: NotificationService, useClass: NotificationServiceMock }
      ],
    });
    service = TestBed.inject(PrioritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
