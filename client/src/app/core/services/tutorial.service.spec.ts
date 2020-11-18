import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { TutorialService } from './tutorial.service';

class MockDocument {}

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TutorialService,
        { provide: DOCUMENT, useClass: MockDocument }
      ],
    });
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
