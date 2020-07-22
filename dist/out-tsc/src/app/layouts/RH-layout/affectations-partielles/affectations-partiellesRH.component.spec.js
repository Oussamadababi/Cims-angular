"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var affectations_partiellesRH_component_1 = require("./affectations-partiellesRH.component");
describe("List_AffectationsComponent", function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [affectations_partiellesRH_component_1.affectations_partiellesComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(affectations_partiellesRH_component_1.affectations_partiellesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=affectations-partiellesRH.component.spec.js.map