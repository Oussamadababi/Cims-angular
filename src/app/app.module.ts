import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
//firebase
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { MessagingService } from "./services/Messaging/messaging.service";
import { AsyncPipe } from "../../node_modules/@angular/common";

import { environment } from "../environments/environment";

import { AgGridModule } from "ag-grid-angular";

import { authInterceptorProviders } from "./services/authentification/_helpers/auth.interceptor";
import { ComponentsPersonnelModule } from "./componentsPersonnel/components.module";
import { ComponentsRHModule } from "./componentsRH/components.module";
import { ComponentsChefServiceModule } from "./componentsChefService/components.module";
import { ComponentsDirecteurModule } from "./componentsDirecteur/components.module";
import { ComponentsDemandeurModule } from "./componentsDemandeur/components.module";
import { ComponentsPlanificateurModule } from "./componentsPlanificateur/components.module";
import { LoginLayoutComponent } from "./login-layout/login-layout.component";
import { RHLayoutComponent } from "./layouts/RH-layout/RH-layout.component";
import { DIRECTEURLayoutComponent } from "./layouts/directeur-layout/directeur-layout.component";
import { ChefServiceLayoutComponent } from "./layouts/chef-service-layout/chef-service-layout.component";
import { PersonnelLayoutComponent } from "./layouts/personnel-layout/personnel-layout.component";
import { DEMANDEURLayoutComponent } from "./layouts/demandeur-layout/demandeur-layout.component";
import { PlanificateurLayoutComponent } from "./layouts/planificateur-layout/planificateur-layout.component";
import { ProfilComponent } from "./profil/profil.component";
//import { CongeComponent } from './layouts/RH-layout/conge/conge.component';
//import { RegisterLayoutComponent } from "./register-layout/register-layout.component";
@NgModule({
  imports: [
    ComponentsPersonnelModule,
    ComponentsChefServiceModule,
    ComponentsDirecteurModule,
    ComponentsRHModule,
    ComponentsDemandeurModule,
    ComponentsPlanificateurModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [
    AppComponent,
    RHLayoutComponent,
    LoginLayoutComponent,
    DIRECTEURLayoutComponent,
    ChefServiceLayoutComponent,
    PersonnelLayoutComponent,
    DEMANDEURLayoutComponent,
    PlanificateurLayoutComponent,
    ProfilComponent,
    //  CongeComponent
    //RegisterLayoutComponent
  ],
  providers: [authInterceptorProviders, MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
