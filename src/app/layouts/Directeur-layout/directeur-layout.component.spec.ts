import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DIRECTEURLayoutComponent } from './directeur-layout.component';

describe('DIRECTEURLayoutComponent', () => {
  let component: DIRECTEURLayoutComponent;
  let fixture: ComponentFixture<DIRECTEURLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DIRECTEURLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DIRECTEURLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
