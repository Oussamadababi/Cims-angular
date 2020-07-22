import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AffPValideesComponent } from "./aff-pvalidees.component";

describe("AffPValideesComponent", () => {
  let component: AffPValideesComponent;
  let fixture: ComponentFixture<AffPValideesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffPValideesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffPValideesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
