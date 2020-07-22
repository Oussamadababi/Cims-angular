import { TestBed } from '@angular/core/testing';

import { DirecteurGuard } from './directeur.guard';

describe('DirecteurGuard', () => {
  let guard: DirecteurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirecteurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
