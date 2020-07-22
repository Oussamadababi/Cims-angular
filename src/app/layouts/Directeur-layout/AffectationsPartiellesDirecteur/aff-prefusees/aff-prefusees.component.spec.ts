import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffPrefuseesComponent } from './aff-prefusees.component';

describe('AffPrefuseesComponent', () => {
  let component: AffPrefuseesComponent;
  let fixture: ComponentFixture<AffPrefuseesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffPrefuseesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffPrefuseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
