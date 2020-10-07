import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRetardPersonnelComponent } from './liste-retard-personnel.component';

describe('ListeRetardPersonnelComponent', () => {
  let component: ListeRetardPersonnelComponent;
  let fixture: ComponentFixture<ListeRetardPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRetardPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRetardPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
