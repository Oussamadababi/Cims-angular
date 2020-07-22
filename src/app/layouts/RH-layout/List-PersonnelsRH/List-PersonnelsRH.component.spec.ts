import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonnelsComponent } from './List-PersonnelsRH.component';

describe('ListPersonnelsComponent', () => {
  let component: ListPersonnelsComponent;
  let fixture: ComponentFixture<ListPersonnelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonnelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
