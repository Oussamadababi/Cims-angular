"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var List_DemandePlanificateur_component_1 = require("./List_DemandePlanificateur.component");
describe('List_DemandeComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [List_DemandePlanificateur_component_1.List_DemandeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(List_DemandePlanificateur_component_1.List_DemandeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=List_DemandePlanificateur.component.spec.js.map