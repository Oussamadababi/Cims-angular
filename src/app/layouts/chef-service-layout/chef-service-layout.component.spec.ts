import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefServiceLayoutComponent } from './chef-service-layout.component';

describe('ChefServiceLayoutComponent', () => {
  let component: ChefServiceLayoutComponent;
  let fixture: ComponentFixture<ChefServiceLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefServiceLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefServiceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
