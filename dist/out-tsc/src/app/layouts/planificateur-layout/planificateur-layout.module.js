"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
//import { PlanificateurLayoutRoutes } from "./planificateur-layout.routing";
var planificateur_layout_routing_1 = require("./planificateur-layout.routing");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var ag_grid_angular_1 = require("ag-grid-angular");
var List_DemandePlanificateur_component_1 = require("./List_DemandePlanificateur/List_DemandePlanificateur.component");
var List_PersonnelsPlanificateur_component_1 = require("./List-PersonnelsPlanificateur/List-PersonnelsPlanificateur.component");
var PlanificateurLayoutModule = /** @class */ (function () {
    function PlanificateurLayoutModule() {
    }
    PlanificateurLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(planificateur_layout_routing_1.PLANIFICATEURLayoutRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_2.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                ag_grid_angular_1.AgGridModule.withComponents([])
            ],
            declarations: [List_DemandePlanificateur_component_1.List_DemandeComponent, List_PersonnelsPlanificateur_component_1.ListPersonnelsComponent]
        })
    ], PlanificateurLayoutModule);
    return PlanificateurLayoutModule;
}());
exports.PlanificateurLayoutModule = PlanificateurLayoutModule;
//# sourceMappingURL=planificateur-layout.module.js.map