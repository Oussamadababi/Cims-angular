import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AffectationsPartiellesCSComponent } from "./AffectationsPartiellesCS.component";

describe("AffectationsPartiellesCSComponent", () => {
  let component: AffectationsPartiellesCSComponent;
  let fixture: ComponentFixture<AffectationsPartiellesCSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationsPartiellesCSComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsPartiellesCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
