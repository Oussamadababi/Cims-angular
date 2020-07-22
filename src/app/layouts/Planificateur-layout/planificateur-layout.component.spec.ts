import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificateurLayoutComponent } from './planificateur-layout.component';

describe('PlanificateurLayoutComponent', () => {
  let component: PlanificateurLayoutComponent;
  let fixture: ComponentFixture<PlanificateurLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificateurLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificateurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
