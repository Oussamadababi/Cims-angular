import { TestBed } from '@angular/core/testing';

import { PersonnelGuard } from './personnel.guard';

describe('PersonnelGuard', () => {
  let guard: PersonnelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonnelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
