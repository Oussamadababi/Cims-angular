import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DIRECTEURLayoutRoutes } from "./directeur-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";
import { AffectationsPartiellesDirecteurComponent } from "./AffectationsPartiellesDirecteur/AffectationsPartiellesDirecteur.component";
import { ListPersonnelsComponent } from "./List-PersonnelsDirecteur/List-PersonnelsDirecteur.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ButtonRendererComponent } from "./AffectationsPartiellesDirecteur/aff-pvalidees/button-renderer.component";
import { ButtonOrdreMissionComponent } from "./AffectationsPartiellesDirecteur/aff-pvalidees/button-ordre-mission.component";
import { ButtonPieceJointeComponent } from "./AffectationsPartiellesDirecteur/aff-pvalidees/button-piece-jointe.component";
import { AffPValideesComponent } from "./AffectationsPartiellesDirecteur/aff-pvalidees/aff-pvalidees.component";
import { AffPrefuseesComponent } from "./AffectationsPartiellesDirecteur/aff-prefusees/aff-prefusees.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DIRECTEURLayoutRoutes),
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
    AffectationsPartiellesDirecteurComponent,
    ListPersonnelsComponent,
    AffectationsTotalesComponent,
    ButtonRendererComponent,
    AffPValideesComponent,
    AffPrefuseesComponent,
    ButtonOrdreMissionComponent,
    ButtonPieceJointeComponent
  ]
})
export class DIRECTEURLayoutModule {}
