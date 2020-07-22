"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
//import { RegisterLayoutComponent } from "./register-layout/register-layout.component";
var login_layout_component_1 = require("./login-layout/login-layout.component");
var RH_layout_component_1 = require("./layouts/RH-layout/RH-layout.component");
var directeur_layout_component_1 = require("./layouts/directeur-layout/directeur-layout.component");
var chef_service_layout_component_1 = require("./layouts/chef-service-layout/chef-service-layout.component");
var personnel_layout_component_1 = require("./layouts/personnel-layout/personnel-layout.component");
var demandeur_layout_component_1 = require("./layouts/demandeur-layout/demandeur-layout.component");
var planificateur_layout_component_1 = require("./layouts/planificateur-layout/planificateur-layout.component");
var profil_component_1 = require("./profil/profil.component");
var rh_guard_1 = require("./guards/auth-guard/RH/rh.guard");
var directeur_guard_1 = require("./guards/auth-guard/Directeur/directeur.guard");
var chef_service_guard_1 = require("./guards/auth-guard/ChefService/chef-service.guard");
var personnel_guard_1 = require("./guards/auth-guard/Personnel/personnel.guard");
var can_login_guard_1 = require("./guards/can-login/can-login.guard");
var routes = [
    //{ path: "register", component: RegisterLayoutComponent },
    {
        path: "login",
        component: login_layout_component_1.LoginLayoutComponent,
        canActivate: [can_login_guard_1.CanLoginGuard]
    },
    { path: "profil", component: profil_component_1.ProfilComponent },
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "RH",
        component: RH_layout_component_1.RHLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/RH-layout/RH-layout.module#RHLayoutModule",
                canActivate: [rh_guard_1.RhGuard]
            }
        ]
    },
    {
        path: "Directeur",
        component: directeur_layout_component_1.DIRECTEURLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/Directeur-layout/directeur-layout.module#DIRECTEURLayoutModule",
                canActivate: [directeur_guard_1.DirecteurGuard]
            }
        ]
    },
    {
        path: "ChefService",
        component: chef_service_layout_component_1.ChefServiceLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/chef-service-layout/chef-service-layout.module#ChefServiceLayoutModule",
                canActivate: [chef_service_guard_1.ChefServiceGuard]
            }
        ]
    },
    {
        path: "CORRESPONDANT",
        component: personnel_layout_component_1.PersonnelLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/personnel-layout/personnel-layout.module#PersonnelLayoutModule",
                canActivate: [personnel_guard_1.PersonnelGuard]
            }
        ]
    },
    {
        path: "Demandeur",
        component: demandeur_layout_component_1.DEMANDEURLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/Demandeur-layout/demandeur-layout.module#DEMANDEURLayoutModule"
            }
        ]
    },
    {
        path: "Planificateur",
        component: planificateur_layout_component_1.PlanificateurLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./layouts/Planificateur-layout/planificateur-layout.module#PlanificateurLayoutModule"
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes, {
                    useHash: true
                })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map