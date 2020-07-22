"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var Mes_Affectations_component_1 = require("./Mes_Affectations.component");
describe("Mes_AffectationsComponent", function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Mes_Affectations_component_1.Mes_AffectationsComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(Mes_Affectations_component_1.Mes_AffectationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=Mes_Affectations.component.spec.js.map