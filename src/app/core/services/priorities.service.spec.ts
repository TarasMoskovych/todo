import { TestBed } from '@angular/core/testing';

import { PrioritiesService } from './priorities.service';

describe('PrioritiesService', () => {
  let service: PrioritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
