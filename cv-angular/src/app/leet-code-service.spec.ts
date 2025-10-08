import { TestBed } from '@angular/core/testing';

import { LeetCodeService } from './leet-code-service';

describe('LeetCodeService', () => {
  let service: LeetCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeetCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
