"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var List_PersonnelsPlanificateur_component_1 = require("./List-PersonnelsPlanificateur.component");
describe('ListPersonnelsComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [List_PersonnelsPlanificateur_component_1.ListPersonnelsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(List_PersonnelsPlanificateur_component_1.ListPersonnelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=List-PersonnelsPlanificateur.component.spec.js.map