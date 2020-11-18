import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CategoriesService } from './categories.service';
import { NotificationService } from './notification.service';

export class NotificationServiceMock {
  showMessage(msg: string) {}
}

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        { provide: NotificationService, useClass: NotificationServiceMock }
      ],
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
