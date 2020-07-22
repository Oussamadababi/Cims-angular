import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelLayoutComponent } from './personnel-layout.component';

describe('PersonnelLayoutComponent', () => {
  let component: PersonnelLayoutComponent;
  let fixture: ComponentFixture<PersonnelLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
