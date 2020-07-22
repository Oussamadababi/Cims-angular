import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsTotalesComponent } from './affectations-totales.component';

describe('AffectationsTotalesComponent', () => {
  let component: AffectationsTotalesComponent;
  let fixture: ComponentFixture<AffectationsTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationsTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
