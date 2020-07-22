import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { affectations_partiellesComponent } from "./affectations-partiellesRH.component";

describe("List_AffectationsComponent", () => {
  let component: affectations_partiellesComponent;
  let fixture: ComponentFixture<affectations_partiellesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [affectations_partiellesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(affectations_partiellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
