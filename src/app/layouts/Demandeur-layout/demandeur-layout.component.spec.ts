import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DEMANDEURLayoutComponent } from './demandeur-layout.component';

describe('DEMANDEURLayoutComponent', () => {
  let component: DEMANDEURLayoutComponent;
  let fixture: ComponentFixture<DEMANDEURLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DEMANDEURLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DEMANDEURLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
