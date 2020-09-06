import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterSoldeComponent } from './consulter-solde.component';

describe('ConsulterSoldeComponent', () => {
  let component: ConsulterSoldeComponent;
  let fixture: ComponentFixture<ConsulterSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
