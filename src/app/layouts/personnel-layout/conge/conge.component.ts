import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { HttpClient } from "@angular/common/http";
import { PersonnelService } from "../../../services/Personnel/personnel.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { TokenStorageService } from 'app/services/authentification/token-storage.service';


@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class CongeComponent implements OnInit {

  constructor(private http: HttpClient,
    private PersonnelService: PersonnelService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService) { }
  rowData: any;
  ngOnInit(): void {
    this.PersonnelService.listCongeParPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
  }
  columnDefs = [
    {
      headerName: "numdemande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "typedeconge",
      field: "typedeconge",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datedebut",
      field: "datedebut",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datefin",
      field: "datefin",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "nombredejour",
      field: "",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "NomPersonnel",
      field: "p.nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]


  conge: object = {
    id: "",
    typedeconge: "",
    datedebut: "",
    datefin: "",
    personnel: { personnel_id: "" }
  };
  add() {
    this.PersonnelService.demandeConge(this.conge, this.tokenStorage.getUser().id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      console.log(this.conge["personnel"].personnel_id);
      this._snackBar.open("demandeConge ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    });
  }


}
@Component({
  selector: "dialog-elements-example-dialog",
  templateUrl: "dialog-elements-example-dialog.html"
})
export class DialogElementsExampleDialog {
  constructor() { }
  ngOnInit(): void {
  }
}