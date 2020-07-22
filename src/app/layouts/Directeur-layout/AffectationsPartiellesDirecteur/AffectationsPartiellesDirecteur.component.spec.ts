import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AffectationsPartiellesDirecteurComponent } from "./AffectationsPartiellesDirecteur.component";

describe("AffectationsPartiellesCSComponent", () => {
  let component: AffectationsPartiellesDirecteurComponent;
  let fixture: ComponentFixture<AffectationsPartiellesDirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationsPartiellesDirecteurComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsPartiellesDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
