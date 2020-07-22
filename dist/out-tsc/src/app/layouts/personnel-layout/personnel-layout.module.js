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
var personnel_layout_routing_1 = require("./personnel-layout.routing");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var ag_grid_angular_1 = require("ag-grid-angular");
var checkbox_1 = require("@angular/material/checkbox");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var dialog_1 = require("@angular/material/dialog");
var Mes_Affectations_component_1 = require("./Mes_Affectations/Mes_Affectations.component");
var PersonnelLayoutModule = /** @class */ (function () {
    function PersonnelLayoutModule() {
    }
    PersonnelLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(personnel_layout_routing_1.PersonnelLayoutRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_2.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                checkbox_1.MatCheckboxModule,
                slide_toggle_1.MatSlideToggleModule,
                dialog_1.MatDialogModule,
                ag_grid_angular_1.AgGridModule.withComponents([])
            ],
            entryComponents: [Mes_Affectations_component_1.DialogElementsExampleDialog],
            declarations: [Mes_Affectations_component_1.DialogElementsExampleDialog, Mes_Affectations_component_1.Mes_AffectationsComponent],
            bootstrap: []
        })
    ], PersonnelLayoutModule);
    return PersonnelLayoutModule;
}());
exports.PersonnelLayoutModule = PersonnelLayoutModule;
//# sourceMappingURL=personnel-layout.module.js.map