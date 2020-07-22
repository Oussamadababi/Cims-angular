import { Routes } from "@angular/router";

import { AffectationsPartiellesDirecteurComponent } from "./AffectationsPartiellesDirecteur/AffectationsPartiellesDirecteur.component";
import { ListPersonnelsComponent } from "./List-PersonnelsDirecteur/List-PersonnelsDirecteur.component";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";
import { AffPValideesComponent } from "./AffectationsPartiellesDirecteur/aff-pvalidees/aff-pvalidees.component";
import { AffPrefuseesComponent } from "./AffectationsPartiellesDirecteur/aff-prefusees/aff-prefusees.component";

export const DIRECTEURLayoutRoutes: Routes = [
  { path: "List_Personnels", component: ListPersonnelsComponent },
  {
    path: "Affectations_partielles",
    component: AffectationsPartiellesDirecteurComponent
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
