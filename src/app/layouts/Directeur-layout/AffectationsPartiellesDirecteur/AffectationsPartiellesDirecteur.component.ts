import { Component, OnInit, forwardRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DirecteurService } from "../../../services/Directeur/directeur.service";
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
  selector: "app-AffectationsPartiellesDirecteur",
  templateUrl: "./AffectationsPartiellesDirecteur.component.html",
  styleUrls: ["./AffectationsPartiellesDirecteur.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AffectationsPartiellesDirecteurComponent)
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class AffectationsPartiellesDirecteurComponent implements OnInit {
  rowDataP: any;
  id: number;
  minDate: Date;
  d: Date;
  dF: Date;
  OrdreAffectationP: any = {
    idO_Aff: ""
  };
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

  AffectationPartielle: any = {
    idAffect: "",
    dateDebut: "",
    datefin: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" },
    jour: this.jours,
    sujet: "Assistance technique",
    etat: { id_etat: "" },
    OrdreAffectationP: {
      idO_Aff: ""
    }
  };
  constructor(
    private http: HttpClient,
    private DirecteurService: DirecteurService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    const myDate = new Date();
    this.minDate = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 3
    );
  }

  ngOnInit(): void {
    this.DirecteurService.listerAffPEnAttente().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });

    this.DirecteurService.listerPersonnel().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
    this.DirecteurService.listerGouvernorats().subscribe(data => {
      var x: any = data;
      this.gouvernorat = x;
    });
    this.DirecteurService.listerPersonnelAyantAffT().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
  }
  onOptionsSelected() {
    this.DirecteurService.getSitesParGouv(
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
    this.DirecteurService.getJours(
      this.AffectationPartielle["personnel"].id_personnel,
      this.d,
      this.dF

    ).subscribe(res => {
      var y: any = res;
      this.days = y;
      console.log(this.AffectationPartielle["dateDebut"]);
      console.log(this.AffectationPartielle["personnel"].id_personnel);
      //console.log(this.days);
    });
  }

  addP() {
    if (this.AffectationPartielle["personnel"].id_personnel != "") {
      if (this.AffectationPartielle["site"].idSite != "") {
        if (this.AffectationPartielle["dateDebut"] != "") {
          if (this.AffectationPartielle["datefin"] != "") {
            if (this.AffectationPartielle["jour"] != "") {
              this.DirecteurService.addAffP(
                this.AffectationPartielle
              ).subscribe(res => {
                console.log(res);
                this.ngOnInit();
              });
              this._snackBar.open(
                "Affectation partielle ajoutée avec succés",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["green-snackbar"]
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
  getId(event) {
    this.id = event.data["idAffect"];
    //console.log(event.data["idAffect"]);
    //console.log(this.id);
  }
  edit(event) {
    if (event.data.etat.id_etat == 1) {
      if (event.data.etat.nom_etat == "VALIDEE") {
        event.data.etat.id_etat = 2;
      }
      if (event.data.etat.nom_etat == "REFUSEE") {
        event.data.etat.id_etat = 3;
      }
      if (
        this.DirecteurService.updateAffectationP(
          event.data["idAffect"],
          event.data
        ).subscribe(res => {
          console.log("Affectation modifiée");
          this._snackBar.open("Affectation modifié avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]
          });
        })
      ) {

      }
    } else {
      console.log("impossible de modifier");
    }
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open(
        "Veuillez sélectionner l'affectation à supprimer",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
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
      maxWidth: 85
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
      maxWidth: 160
    },
    {
      headerName: "Date debut",
      field: "dateDebut",
      sortable: true,
      editable: true,
      maxWidth: 140,
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: "Date fin",
      field: "datefin",
      sortable: true,
      editable: true,
      maxWidth: 130,
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      headerName: "Jour",
      field: "jour",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Sujet",
      field: "sujet",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 170
    },
    {
      headerName: "Etat",
      field: "etat.nom_etat",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["EN_ATTENTE", "VALIDEE", "REFUSEE"]
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130,
      cellStyle: { color: "#16a6b6", fontWeight: 'bold' }
    }
  ];
}


@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
})
export class DialogConfirmation implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    private http: HttpClient,
    private DirecteurService: DirecteurService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.DirecteurService.deleteAffectationP(this.id).subscribe(res => {
        console.log("Affectation partielle Supprimée");
        this.dialogRef.close();
      });
    }
  }
}