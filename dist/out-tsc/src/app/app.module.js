"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
//firebase
var messaging_1 = require("@angular/fire/messaging");
var database_1 = require("@angular/fire/database");
var auth_1 = require("@angular/fire/auth");
var fire_1 = require("@angular/fire");
var messaging_service_1 = require("./services/Messaging/messaging.service");
var common_1 = require("../../node_modules/@angular/common");
var environment_1 = require("../environments/environment");
var ag_grid_angular_1 = require("ag-grid-angular");
var auth_interceptor_1 = require("./services/authentification/_helpers/auth.interceptor");
var components_module_1 = require("./componentsPersonnel/components.module");
var components_module_2 = require("./componentsRH/components.module");
var components_module_3 = require("./componentsChefService/components.module");
var components_module_4 = require("./componentsDirecteur/components.module");
var components_module_5 = require("./componentsDemandeur/components.module");
var components_module_6 = require("./componentsPlanificateur/components.module");
var login_layout_component_1 = require("./login-layout/login-layout.component");
var RH_layout_component_1 = require("./layouts/RH-layout/RH-layout.component");
var directeur_layout_component_1 = require("./layouts/directeur-layout/directeur-layout.component");
var chef_service_layout_component_1 = require("./layouts/chef-service-layout/chef-service-layout.component");
var personnel_layout_component_1 = require("./layouts/personnel-layout/personnel-layout.component");
var demandeur_layout_component_1 = require("./layouts/demandeur-layout/demandeur-layout.component");
var planificateur_layout_component_1 = require("./layouts/planificateur-layout/planificateur-layout.component");
var profil_component_1 = require("./profil/profil.component");
//import { RegisterLayoutComponent } from "./register-layout/register-layout.component";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                components_module_1.ComponentsPersonnelModule,
                components_module_3.ComponentsChefServiceModule,
                components_module_4.ComponentsDirecteurModule,
                components_module_2.ComponentsRHModule,
                components_module_5.ComponentsDemandeurModule,
                components_module_6.ComponentsPlanificateurModule,
                ag_grid_angular_1.AgGridModule.withComponents([]),
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule,
                app_routing_1.AppRoutingModule,
                database_1.AngularFireDatabaseModule,
                auth_1.AngularFireAuthModule,
                messaging_1.AngularFireMessagingModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebase)
            ],
            declarations: [
                app_component_1.AppComponent,
                RH_layout_component_1.RHLayoutComponent,
                login_layout_component_1.LoginLayoutComponent,
                directeur_layout_component_1.DIRECTEURLayoutComponent,
                chef_service_layout_component_1.ChefServiceLayoutComponent,
                personnel_layout_component_1.PersonnelLayoutComponent,
                demandeur_layout_component_1.DEMANDEURLayoutComponent,
                planificateur_layout_component_1.PlanificateurLayoutComponent,
                profil_component_1.ProfilComponent
                //RegisterLayoutComponent
            ],
            providers: [auth_interceptor_1.authInterceptorProviders, messaging_service_1.MessagingService, common_1.AsyncPipe],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map