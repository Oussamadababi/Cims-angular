import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPersComponent } from './dashbord-pers.component';

describe('DashbordPersComponent', () => {
  let component: DashbordPersComponent;
  let fixture: ComponentFixture<DashbordPersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordPersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
