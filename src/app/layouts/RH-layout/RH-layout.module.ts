import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RHLayoutRoutes } from "./RH-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";
import { ButtonRendererComponent } from "./affectations-partielles/button-renderer.component";
import { ButtonOrdreMissionComponent } from "./affectations-partielles/button-ordre-mission.component";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { ListDepartementComponent } from "./list-departement/list-departement.component";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { ListGradesComponent } from "./list-grades/list-grades.component";
import { ListSitesComponent } from "./list-sites/list-sites.component";
import { DropDownEditor } from "./list-sites/drop-down-editor";
import { DropDownEditorDept } from "./List-PersonnelsRH/drop-down-dept";
import { DropDownEditorGrade } from "./List-PersonnelsRH/drop-down-grade";
import { DropDownEditorSite } from "./affectations-totales/drop-down-site";
import { ListPersonnelsComponent } from "./List-PersonnelsRH/List-PersonnelsRH.component";
import { affectations_partiellesComponent } from "./affectations-partielles/affectations-partiellesRH.component";
import { AffectationsTotalesComponent } from "./affectations-totales/affectations-totales.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CongeComponent } from './conge/conge.component';
import { AbsenceComponent } from './absence/absence.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RHLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,

    AgGridModule.withComponents([])
  ],
  declarations: [
    affectations_partiellesComponent,
    ListPersonnelsComponent,
    DashboardComponent,
    ListSitesComponent,
    ListGradesComponent,
    ListDepartementComponent,
    AffectationsTotalesComponent,
    DropDownEditor,
    ButtonRendererComponent,
    DropDownEditorDept,
    DropDownEditorGrade,
    DropDownEditorSite,
    ButtonOrdreMissionComponent,
    CongeComponent,
    AbsenceComponent
  ]
})
export class RHLayoutModule { }
