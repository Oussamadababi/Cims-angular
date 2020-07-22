import { Routes } from "@angular/router";

import { List_DemandeComponent } from "./List_DemandeDemandeur/List_DemandeDemandeur.component";
import { ListPersonnelsComponent } from "./List-PersonnelsDemandeur/List-PersonnelsDemandeur.component";

export const DEMANDEURLayoutRoutes: Routes = [
  { path: "List_Demande", component: List_DemandeComponent },
  { path: "List_Personnels", component: ListPersonnelsComponent }
];
