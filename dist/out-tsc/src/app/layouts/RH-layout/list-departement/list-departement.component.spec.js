"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var list_departement_component_1 = require("./list-departement.component");
describe("ListDepartementComponent", function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [list_departement_component_1.ListDepartementComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(list_departement_component_1.ListDepartementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=list-departement.component.spec.js.map