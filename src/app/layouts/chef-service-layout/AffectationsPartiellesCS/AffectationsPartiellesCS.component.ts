import { Component, OnInit, forwardRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChefServiceService } from "../../../services/ChefService/chef-service.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-AffectationsPartiellesCS",
  templateUrl: "./AffectationsPartiellesCS.component.html",
  styleUrls: ["./AffectationsPartiellesCS.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AffectationsPartiellesCSComponent)
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class AffectationsPartiellesCSComponent implements OnInit {
  message: string;
  rowDataP: any;
  minDate: Date;
  d: Date;
  dF: Date;
  site: any[] = [
    {
      idSite: "",
      nomSite: "",
      gouvernorat: {
        idGouv: ""
      }
    }
  ];
  gouvselecter: any;
  personnel: any;
  gouvernorat: any[] = [
    {
      idGouv: "",
      nomGouv: ""
    }
  ];
  jours: string[] = [];
  days: string[] = [];

  AffectationPartielle: object = {
    idAffect: "",
    dateDebut: "",
    datefin: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" },
    jour: this.jours,
    sujet: "Assistance technique",
    etat: { id_etat: "" }
  };

  constructor(
    private http: HttpClient,
    private CS_Service: ChefServiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    const myDate = new Date();
    this.minDate = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 3
    );
    var start = new Date(1990, 0, 1);
  }

  ngOnInit(): void {
    this.CS_Service.listerAffPEnAttente().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });
    this.CS_Service.listerPersonnel().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
    this.CS_Service.listerGouvernorats().subscribe(data => {
      var x: any = data;
      this.gouvernorat = x;
      console.log(this.gouvernorat[0]);
    });
    this.CS_Service.listerPersonnelAyantAffT().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
  }
  onOptionsSelected() {
    this.CS_Service.getSitesParGouv(
      this.gouvselecter,
      this.AffectationPartielle["personnel"].id_personnel
    ).subscribe(res => {
      var y: any = res;
      this.site = y;
    });
  }

  onOptionsSelectedDate() {
    this.d = new Date(this.AffectationPartielle["dateDebut"]);
    this.dF = new Date(this.AffectationPartielle["datefin"]);
    this.CS_Service.getJours(
      this.AffectationPartielle["personnel"].id_personnel,
      this.d,
      this.dF

    ).subscribe(res => {
      var y: any = res;
      this.days = y;
      console.log(this.AffectationPartielle["dateDebut"]);
      console.log(this.AffectationPartielle["personnel"].id_personnel);
      // console.log(this.days);
    });
  }
  addP() {
    if (this.AffectationPartielle["personnel"].id_personnel != "") {
      if (this.AffectationPartielle["site"].idSite != "") {
        if (this.AffectationPartielle["dateDebut"] != "") {
          if (this.AffectationPartielle["datefin"] != "") {
            if (this.AffectationPartielle["jour"] != "") {
              this.CS_Service.addAffP(this.AffectationPartielle).subscribe(
                res => {
                  console.log(res);
                  this.ngOnInit();
                  this._snackBar.open(
                    "Affectation partielle ajoutée avec succés",
                    "OK",
                    {
                      duration: 2000,
                      panelClass: ["green-snackbar"]
                    }
                  );
                }, err => {
                  this.message = err.error.message;
                  this.dialog.open(DialogError, {
                    data: this.message
                  });

                }
              );

            } else {
              this._snackBar.open("Veuillez choisir le(s) jour(s) ", "OK", {
                duration: 2000,
                panelClass: ["red-snackbar"]
              });
            }
          } else {
            this._snackBar.open("Veuillez choisir la date fin ", "OK", {
              duration: 2000,
              panelClass: ["red-snackbar"]
            });
          }
        } else {
          this._snackBar.open("Veuillez choisir la date du début ", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });
        }
      } else {
        this._snackBar.open("Veuillez sélectionner le site ", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const d = new Date(date);
    const day = d.getDay();
    return day !== 0;
  };
  columnDefsP = [
    {
      headerName: "ID",
      field: "idAffect",
      sortable: true,
      filter: true,
      maxWidth: 90
    },
    {
      headerName: "personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      maxWidth: 180
    },
    {
      headerName: "Site",
      field: "site.nomSite",
      sortable: true,
      filter: true,
      maxWidth: 150
    },
    {
      headerName: "Date debut",
      field: "dateDebut",
      sortable: true,
      filter: true,
      maxWidth: 150
    },
    {
      headerName: "Date fin",
      field: "datefin",
      sortable: true,
      filter: true,
      maxWidth: 140
    },

    {
      headerName: "Jour",
      field: "jour",
      sortable: true,
      filter: true,
      maxWidth: 230
    },
    {
      headerName: "Sujet",
      field: "sujet",
      sortable: true,
      filter: true,
      maxWidth: 170
    },
    {
      headerName: "Etat",
      field: "etat.nom_etat",

      sortable: true,
      filter: true,
      maxWidth: 130,
      cellStyle: { color: "#16a6b6", fontWeight: 'bold' }
    }
  ];
}
////

@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.html',
})
export class DialogError implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogError>,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public msg: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.message = this.msg;
  }

}