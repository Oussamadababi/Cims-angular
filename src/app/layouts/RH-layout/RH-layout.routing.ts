import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { affectations_partiellesComponent } from "./affectations-partielles/affectations-partiellesRH.component";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";
import { ListPersonnelsComponent } from "./List-PersonnelsRH/List-PersonnelsRH.component";
import { ListSitesComponent } from "./list-sites/list-sites.component";
import { ListGradesComponent } from "./list-grades/list-grades.component";
import { ListDepartementComponent } from "./list-departement/list-departement.component";
import { CongeComponent } from "./conge/conge.component";
import { AbsenceComponent } from "./absence/absence.component";

export const RHLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "List_AffectationsTotales", component: AffectationsTotalesComponent },
  {
    path: "List_AffectationsPartielles",
    component: affectations_partiellesComponent
  },
  { path: "List_Personnels", component: ListPersonnelsComponent },
  { path: "List_Sites", component: ListSitesComponent },
  { path: "List_Grades", component: ListGradesComponent },
  { path: "List_Departements", component: ListDepartementComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "Gestion_Conge", component: CongeComponent },
  { path: "Absence", component: AbsenceComponent }
];
