import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChefServiceLayoutRoutes } from "./chef-service-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

import { AffectationsPartiellesCSComponent } from "./AffectationsPartiellesCS/AffectationsPartiellesCS.component";
import { ListPersonnelsComponent } from "./List-PersonnelsCS/List-PersonnelsCS.component";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ButtonRendererComponent } from "./AffectationsPartiellesCS/aff-pvalidees/button-renderer.component";
import { ButtonOrdreMissionComponent } from "./AffectationsPartiellesCS/aff-pvalidees/button-ordre-mission.component";
import { ButtonPieceJointeComponent } from "./AffectationsPartiellesCS/aff-pvalidees/button-piece-jointe.component";
import { AffPValideesComponent } from "./AffectationsPartiellesCS/aff-pvalidees/aff-pvalidees.component";
import { AffPrefuseesComponent } from "./AffectationsPartiellesCS/aff-prefusees/aff-prefusees.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChefServiceLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridModule.withComponents([]),
    MatSnackBarModule
  ],
  declarations: [
    AffectationsPartiellesCSComponent,
    ListPersonnelsComponent,
    AffectationsTotalesComponent,
    ButtonRendererComponent,
    AffPValideesComponent,
    AffPrefuseesComponent,
    ButtonOrdreMissionComponent,
    ButtonPieceJointeComponent
  ]
})
export class ChefServiceLayoutModule {}
