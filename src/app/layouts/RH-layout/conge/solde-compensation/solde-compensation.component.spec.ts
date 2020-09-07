import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeCompensationComponent } from './solde-compensation.component';

describe('SoldeCompensationComponent', () => {
  let component: SoldeCompensationComponent;
  let fixture: ComponentFixture<SoldeCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldeCompensationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldeCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
