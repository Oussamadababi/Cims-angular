import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

//import { RegisterLayoutComponent } from "./register-layout/register-layout.component";
import { LoginLayoutComponent } from "./login-layout/login-layout.component";
import { RHLayoutComponent } from "./layouts/RH-layout/RH-layout.component";
import { DIRECTEURLayoutComponent } from "./layouts/directeur-layout/directeur-layout.component";
import { ChefServiceLayoutComponent } from "./layouts/chef-service-layout/chef-service-layout.component";
import { PersonnelLayoutComponent } from "./layouts/personnel-layout/personnel-layout.component";
import { DEMANDEURLayoutComponent } from "./layouts/demandeur-layout/demandeur-layout.component";
import { PlanificateurLayoutComponent } from "./layouts/planificateur-layout/planificateur-layout.component";
import { ProfilComponent } from "./profil/profil.component";
import { RhGuard } from "./guards/auth-guard/RH/rh.guard";
import { DirecteurGuard } from "./guards/auth-guard/Directeur/directeur.guard";
import { ChefServiceGuard } from "./guards/auth-guard/ChefService/chef-service.guard";
import { PersonnelGuard } from "./guards/auth-guard/Personnel/personnel.guard";
import { CanLoginGuard } from "./guards/can-login/can-login.guard";
const routes: Routes = [
  //{ path: "register", component: RegisterLayoutComponent },
  {
    path: "login",
    component: LoginLayoutComponent,
    canActivate: [CanLoginGuard]
  },
  { path: "profil", component: ProfilComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "RH",
    component: RHLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./layouts/RH-layout/RH-layout.module#RHLayoutModule",
        canActivate: [RhGuard]
      }
    ]
  },
  {
    path: "Directeur",
    component: DIRECTEURLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/Directeur-layout/directeur-layout.module#DIRECTEURLayoutModule",
        canActivate: [DirecteurGuard]
      }
    ]
  },
  {
    path: "ChefService",
    component: ChefServiceLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/chef-service-layout/chef-service-layout.module#ChefServiceLayoutModule",
        canActivate: [ChefServiceGuard]
      }
    ]
  },
  {
    path: "CORRESPONDANT",
    component: PersonnelLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/personnel-layout/personnel-layout.module#PersonnelLayoutModule",
        canActivate: [PersonnelGuard]
      }
    ]
  },
  {
    path: "Demandeur",
    component: DEMANDEURLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/Demandeur-layout/demandeur-layout.module#DEMANDEURLayoutModule"
      }
    ]
  },
  {
    path: "Planificateur",
    component: PlanificateurLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/Planificateur-layout/planificateur-layout.module#PlanificateurLayoutModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
