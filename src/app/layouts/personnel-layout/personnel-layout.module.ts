import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonnelLayoutRoutes } from "./personnel-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import {
  Mes_AffectationsComponent,
  DialogElementsExampleDialog, DialogUpdateMission
} from "./Mes_Affectations/Mes_Affectations.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DashbordPersComponent } from './dashbord-pers/dashbord-pers.component';
import { CongeComponent } from './conge/conge.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersonnelLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    AgGridModule.withComponents([]),
    MatRadioModule,
    MatSnackBarModule,
    MatDatepickerModule,
  ],
  entryComponents: [DialogElementsExampleDialog, DialogUpdateMission],
  declarations: [DialogElementsExampleDialog, Mes_AffectationsComponent, DialogUpdateMission, DashbordPersComponent, CongeComponent],
  bootstrap: []
})
export class PersonnelLayoutModule { }
