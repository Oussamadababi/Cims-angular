"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var AffectationsPartiellesDirecteur_component_1 = require("./AffectationsPartiellesDirecteur.component");
describe("AffectationsPartiellesCSComponent", function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [AffectationsPartiellesDirecteur_component_1.AffectationsPartiellesDirecteurComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(AffectationsPartiellesDirecteur_component_1.AffectationsPartiellesDirecteurComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=AffectationsPartiellesDirecteur.component.spec.js.map