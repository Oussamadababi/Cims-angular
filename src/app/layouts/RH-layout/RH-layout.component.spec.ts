import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RHLayoutComponent } from './RH-layout.component';

describe('RHLayoutComponent', () => {
  let component: RHLayoutComponent;
  let fixture: ComponentFixture<RHLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RHLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RHLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
