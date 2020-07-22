"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_component_1 = require("../../dashboard/dashboard.component");
var affectations_partiellesRH_component_1 = require("./affectations-partielles/affectations-partiellesRH.component");
var affectations_totales_component_1 = require("./affectations-totales/affectations-totales.component");
var List_PersonnelsRH_component_1 = require("./List-PersonnelsRH/List-PersonnelsRH.component");
var list_sites_component_1 = require("./list-sites/list-sites.component");
var list_grades_component_1 = require("./list-grades/list-grades.component");
var list_departement_component_1 = require("./list-departement/list-departement.component");
exports.RHLayoutRoutes = [
    { path: "", component: dashboard_component_1.DashboardComponent },
    { path: "List_AffectationsTotales", component: affectations_totales_component_1.AffectationsTotalesComponent },
    {
        path: "List_AffectationsPartielles",
        component: affectations_partiellesRH_component_1.affectations_partiellesComponent
    },
    { path: "List_Personnels", component: List_PersonnelsRH_component_1.ListPersonnelsComponent },
    { path: "List_Sites", component: list_sites_component_1.ListSitesComponent },
    { path: "List_Grades", component: list_grades_component_1.ListGradesComponent },
    { path: "List_Departements", component: list_departement_component_1.ListDepartementComponent },
    { path: "dashboard", component: dashboard_component_1.DashboardComponent }
];
//# sourceMappingURL=RH-layout.routing.js.map