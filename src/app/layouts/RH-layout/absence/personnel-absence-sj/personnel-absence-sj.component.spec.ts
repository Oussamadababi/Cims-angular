import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelAbsenceSJComponent } from './personnel-absence-sj.component';

describe('PersonnelAbsenceSJComponent', () => {
  let component: PersonnelAbsenceSJComponent;
  let fixture: ComponentFixture<PersonnelAbsenceSJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelAbsenceSJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelAbsenceSJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
