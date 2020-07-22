"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AffectationsPartiellesCS_component_1 = require("./AffectationsPartiellesCS/AffectationsPartiellesCS.component");
var List_PersonnelsCS_component_1 = require("./List-PersonnelsCS/List-PersonnelsCS.component");
var affectations_totales_component_1 = require("./affectations-totales/affectations-totales.component");
exports.ChefServiceLayoutRoutes = [
    { path: "List_Personnels", component: List_PersonnelsCS_component_1.ListPersonnelsComponent },
    {
        path: "Affectations_partielles",
        component: AffectationsPartiellesCS_component_1.AffectationsPartiellesCSComponent
    },
    {
        path: "Affectations_Totales",
        component: affectations_totales_component_1.AffectationsTotalesComponent
    }
];
//# sourceMappingURL=chef-service-layout.routing.js.map