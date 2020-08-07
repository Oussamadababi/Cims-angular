import { Component, OnInit, Inject } from '@angular/core';
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
import { RHService } from 'app/services/RH/rhservice.service';


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
  rowData1: any;
  id: number;
  ngOnInit(): void {
    this.PersonnelService.listCongeParPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.PersonnelService.annulationCongeparPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.rowData1 = res;
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
      headerName: "etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]

  conge2: object;
  conge: object = {
    id: "",
    typedeconge: "",
    datedebut: "",
    datefin: "",
    personnel: { personnel_id: "" }
  };
  add() {
    this.conge2 = this.PersonnelService.congeparPersonnelenattenteCompte(this.tokenStorage.getUser().id).subscribe(res => { });
    //if (this.conge2 == null) {
    if (this.conge["typedeconge"] != "") {
      if (this.conge["datedebut"] != "") {
        if (this.conge["datefin"] != "") {
          if (this.conge["personnel"].personnel_id != "") {
            if (this.conge["datedebut"] < this.conge["datefin"]) {
              this.PersonnelService.demandeConge(this.conge, this.tokenStorage.getUser().id).subscribe(res => {
                this.ngOnInit();
                console.log(res);
                console.log(this.conge["personnel"].personnel_id);
                this._snackBar.open("demandeConge ajouté avec succés", "OK", {
                  duration: 2000,
                  panelClass: ["green-snackbar"]
                });
              });
            } else {
              this._snackBar.open(
                "verifier les date du conge ",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                }
              );

            }
          }
          else {
            this._snackBar.open(
              "Veuillez insérer le nom du personnel ",
              "OK",
              {
                duration: 2000,
                panelClass: ["red-snackbar"]
              }
            );
          }
        }
        else {
          this._snackBar.open(
            "Veuillez insérer datefin du conge ",
            "OK",
            {
              duration: 2000,
              panelClass: ["red-snackbar"]
            }
          );

        }
      }
      else {
        this._snackBar.open(
          "Veuillez insérer datedebut du conge ",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    }
    else {
      this._snackBar.open(
        "Veuillez insérer typedeconge ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
    /* } else {
       this._snackBar.open(
         "il y a une demande encours ",
         "OK",
         {
           duration: 2000,
           panelClass: ["red-snackbar"]
         }
       );
 
     }*/
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  getId(event) {
    this.id = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.id);
  }
  ajouterAnuulationConge() {
    /*  this.AnnulationConge = this.Rhservice.annulationCongeenAttente(this.conge["personnel"].personnel_id).subscribe(res => {
      });*/
    //if (this.AnnulationConge == null) {
    this.PersonnelService.ajouterAnnulationConge(this.id).subscribe(res => {

      console.log(res);
      this._snackBar.open("demandeConge ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]

      });
    });
  }
  columnAnnulationConge = [
    {
      headerName: "numdemande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datedemande",
      field: "datedemande",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Conge_id",
      field: "conge.id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]


}
@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
})
export class DialogConfirmation implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    private http: HttpClient,
    private PersonnelService: PersonnelService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.PersonnelService.deleteConge(this.id).subscribe(res => {
        console.log("congee Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}