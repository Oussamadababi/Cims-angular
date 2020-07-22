"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AffectationsPartiellesDirecteur_component_1 = require("./AffectationsPartiellesDirecteur/AffectationsPartiellesDirecteur.component");
var List_PersonnelsDirecteur_component_1 = require("./List-PersonnelsDirecteur/List-PersonnelsDirecteur.component");
var affectations_totales_component_1 = require("./affectations-totales/affectations-totales.component");
exports.DIRECTEURLayoutRoutes = [
    { path: "List_Personnels", component: List_PersonnelsDirecteur_component_1.ListPersonnelsComponent },
    {
        path: "Affectations_partielles",
        component: AffectationsPartiellesDirecteur_component_1.AffectationsPartiellesDirecteurComponent
    },
    {
        path: "Affectations_Totales",
        component: affectations_totales_component_1.AffectationsTotalesComponent
    }
];
//# sourceMappingURL=directeur-layout.routing.js.map