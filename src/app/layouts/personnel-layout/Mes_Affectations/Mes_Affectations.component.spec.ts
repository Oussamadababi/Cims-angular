import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Mes_AffectationsComponent } from "./Mes_Affectations.component";

describe("Mes_AffectationsComponent", () => {
  let component: Mes_AffectationsComponent;
  let fixture: ComponentFixture<Mes_AffectationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Mes_AffectationsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mes_AffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
