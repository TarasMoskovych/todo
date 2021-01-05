import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBarService', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: matSnackBarSpy },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show message', () => {
    const message = 'success message';
    service.showMessage(message);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Okay', { duration: 2000 });
    expect(matSnackBarSpy.open).toHaveBeenCalledTimes(1);
  });
});
