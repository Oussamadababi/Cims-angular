import { TestBed } from '@angular/core/testing';

import { RhGuard } from './rh.guard';

describe('RhGuard', () => {
  let guard: RhGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RhGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
