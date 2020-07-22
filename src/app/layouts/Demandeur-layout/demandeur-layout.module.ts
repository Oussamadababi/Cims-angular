import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DEMANDEURLayoutRoutes } from "./demandeur-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";

import { List_DemandeComponent } from "./List_DemandeDemandeur/List_DemandeDemandeur.component";
import { ListPersonnelsComponent } from "./List-PersonnelsDemandeur/List-PersonnelsDemandeur.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DEMANDEURLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AgGridModule.withComponents([])
  ],
  declarations: [List_DemandeComponent, ListPersonnelsComponent]
})
export class DEMANDEURLayoutModule { }
