"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var AffectationsPartiellesCS_component_1 = require("./AffectationsPartiellesCS.component");
describe("AffectationsPartiellesCSComponent", function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [AffectationsPartiellesCS_component_1.AffectationsPartiellesCSComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(AffectationsPartiellesCS_component_1.AffectationsPartiellesCSComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=AffectationsPartiellesCS.component.spec.js.map