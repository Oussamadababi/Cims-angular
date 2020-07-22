import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListDepartementComponent } from "./list-departement.component";

describe("ListDepartementComponent", () => {
  let component: ListDepartementComponent;
  let fixture: ComponentFixture<ListDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepartementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
