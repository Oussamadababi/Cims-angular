"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var List_PersonnelsDemandeur_component_1 = require("./List-PersonnelsDemandeur.component");
describe('ListPersonnelsComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [List_PersonnelsDemandeur_component_1.ListPersonnelsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(List_PersonnelsDemandeur_component_1.ListPersonnelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=List-PersonnelsDemandeur.component.spec.js.map