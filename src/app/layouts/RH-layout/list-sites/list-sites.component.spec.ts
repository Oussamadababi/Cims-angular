import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSitesComponent } from './list-sites.component';

describe('ListSitesComponent', () => {
  let component: ListSitesComponent;
  let fixture: ComponentFixture<ListSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
