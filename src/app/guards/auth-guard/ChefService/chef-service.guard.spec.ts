import { TestBed } from '@angular/core/testing';

import { ChefServiceGuard } from './chef-service.guard';

describe('ChefServiceGuard', () => {
  let guard: ChefServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
