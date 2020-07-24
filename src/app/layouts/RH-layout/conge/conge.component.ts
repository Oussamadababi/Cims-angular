import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
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
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);
      this.nombreJourConge = (this.conge["datefin"] - this.conge["datedebut"]) / 86400000;
    });
  }

  conge: object = {
    id: "",
    typedeconge: "",
    datedebut: "",
    datefin: "",
    personnel: { personnel_id: "" }
  };
  nombreJourConge: any;

  add() {
    if (this.conge["typedeconge"] != "") {
      if (this.conge["datedebut"] != "") {
        if (this.conge["datefin"] != "") {
          if (this.conge["personnel"].personnel_id != "") {
            if (this.conge["datedebut"] < this.conge["datefin"]) {

              this.Rhservice.ajouterConge(this.conge, this.conge["personnel"].personnel_id).subscribe(res => {
                console.log(res);
                console.log(this.conge["personnel"].personnel_id);
                this.nombreJourConge = (this.conge["datefin"] - this.conge["datedebut"]) / 86400000;
                console.log((this.conge["datefin"] - this.conge["datedebut"]) / 86400000);
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

  }


}
