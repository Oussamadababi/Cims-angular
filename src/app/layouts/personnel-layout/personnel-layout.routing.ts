import { Routes } from "@angular/router";

import { Mes_AffectationsComponent } from "./Mes_Affectations/Mes_Affectations.component";
import { DashbordPersComponent } from "./dashbord-pers/dashbord-pers.component";

export const PersonnelLayoutRoutes: Routes = [
  { path: "Mes_Affectations", component: Mes_AffectationsComponent },
  { path: "dashboard", component: DashbordPersComponent }
];
