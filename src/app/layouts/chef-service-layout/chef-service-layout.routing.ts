import { Routes } from "@angular/router";

import { AffectationsPartiellesCSComponent } from "./AffectationsPartiellesCS/AffectationsPartiellesCS.component";
import { ListPersonnelsComponent } from "./List-PersonnelsCS/List-PersonnelsCS.component";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";
import { AffPrefuseesComponent } from "./AffectationsPartiellesCS/aff-prefusees/aff-prefusees.component";
import { AffPValideesComponent } from "./AffectationsPartiellesCS/aff-pvalidees/aff-pvalidees.component";

export const ChefServiceLayoutRoutes: Routes = [
  { path: "List_Personnels", component: ListPersonnelsComponent },
  {
    path: "Affectations_partielles",
    component: AffectationsPartiellesCSComponent
  },
  {
    path: "Affectations_partiellesR",
    component: AffPrefuseesComponent
  },
  {
    path: "Affectations_partiellesV",
    component: AffPValideesComponent
  },
  {
    path: "Affectations_Totales",
    component: AffectationsTotalesComponent
  }
];
