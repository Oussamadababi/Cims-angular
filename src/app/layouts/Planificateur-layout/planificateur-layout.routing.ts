import { Routes } from "@angular/router";

import { List_DemandeComponent } from "./List_DemandePlanificateur/List_DemandePlanificateur.component";
import { ListPersonnelsComponent } from "./List-PersonnelsPlanificateur/List-PersonnelsPlanificateur.component";

export const PLANIFICATEURLayoutRoutes: Routes = [
  { path: "List_Demande", component: List_DemandeComponent },
  { path: "List_Personnels", component: ListPersonnelsComponent }
];
