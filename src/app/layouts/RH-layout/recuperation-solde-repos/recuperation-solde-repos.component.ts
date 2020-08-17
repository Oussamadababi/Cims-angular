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
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperation-solde-repos',
  templateUrl: './recuperation-solde-repos.component.html',
  styleUrls: ['./recuperation-solde-repos.component.css']
})
export class RecuperationSoldeReposComponent implements OnInit {
  form: FormGroup;
  rowData: any;

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })


  }
  conge2: object;
  RSR: object = {
    personnel: { personnel_id: "" }
  };
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;

    });

    this.Rhservice.listRSR().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

  }
  add() {

    console.log(this.RSR["personnel"].personnel_id);
    this.Rhservice.ajouterRSR(this.RSR, this.RSR["personnel"].personnel_id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      console.log(this.RSR["personnel"].personnel_id);
      this._snackBar.open("Demande De recuperation Solde repos ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    });
  }

  columnRSR = [
    {
      headerName: "Num Demande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Date demandé",
      field: "datedemande",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "prenom personnel",
      field: "p.prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Nom personnel",
      field: "p.nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Solde Repos",
      field: "p.soldeRepos",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Solde Recuperer",
      field: "soldeRecuperer",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Titre Annee",
      field: "titreAnnee",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]
  idA: number;
  getIdA(event1) {
    this.idA = event1.data["id"];
    console.log(event1.data["id"]);
    console.log(this.idA);
  }
  AccepterDemandeRSR() {
    this.Rhservice.AccepterDemandeRSR(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Recuperation Solde Repos est accepté", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }

  RefusererDemandeRSR() {
    this.Rhservice.RefuserDemandeRSR(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Recuperation Solde Repos est refusé", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }

}
