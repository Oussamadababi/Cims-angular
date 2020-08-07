import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperationSoldeReposComponent } from './recuperation-solde-repos.component';

describe('RecuperationSoldeReposComponent', () => {
  let component: RecuperationSoldeReposComponent;
  let fixture: ComponentFixture<RecuperationSoldeReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperationSoldeReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperationSoldeReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
