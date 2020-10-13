import { Component, OnInit, Inject } from '@angular/core';
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
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: DatePipe }
  ]

})
export class CongeComponent implements OnInit {
  rowData: any;
  rowData1: any;
  form: FormGroup;
  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })

  }
  today: any = new Date().getFullYear();
  personnel: object =
    {
      id_personnel: "",
      matricule: "",
      nom: "",
      prenom: "",
      sexe: "",
      telephone: "",
      soldeRepos: "",
      soldeReposN_1: "",
      soldeReposN_2: "",
      soldeExceptionnel: "",
      soldeCompensation: "",
      date_recrutement: "",
      email: "",
      nom_AR: "",
      prenom_AR: "",
      matricule_CNRPS: "",
      matricule_CNSS: "",
      date_Naissance: "",
      adresse: "",
      poste_Occupe: "",
      date_Promotion: "",
      echelle: "",
      date_Echelle: "",
      echellon: "",
      date_Echellon: "",
      date_fonction: "",
      departement: { id_dept: "" },
      grade: { id_grade: "" },
      nbrMinuteRetard: ""



    }
  onOptionsSelected2() {
    this.Rhservice.getPersonnel(this.conge["personnel"].personnel_id).subscribe(res => {
      var y: any = res;
      console.log(res);
      this.personnel = y;

      console.log("bbbbbbbbbbbbbbb" + this.personnel["soldeRepos"])
      console.log(this.personnel["soldeReposN_2"])
    });
  }
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);
      console.log(this.conge["datefin"]);
      this.nombreJourConge = (this.conge["datefin"] - this.conge["datedebut"]) / 86400000;
    });
    this.Rhservice.listConge().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

    this.Rhservice.listAnnulationConge().subscribe(res => {
      console.log(res);
      this.rowData1 = res;
    });

  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  columnDefs = [
    {
      headerName: "Numdemande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 120
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
      field: "numDeJour",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "NbrMois",
      field: "numDeMois",
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
    },
    {
      headerName: "PrenomP",
      field: "p.prenom",

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
    }
  ]
  conge2: object;
  conge: object = {
    id: "",
    typedeconge: "",
    datedebut: "",
    numDeJour: "",
    numDeMois: "",
    personnel: { personnel_id: "" }
  };

  id: number;
  idA: number;
  nombreJourConge: any;
  annulation: boolean;
  getId(event) {
    this.id = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.id);
    this.AnnulationConge = this.Rhservice.annulationCongeenAttente(this.id).subscribe(res => {
      console.log(res);
      if (res == null) {
        this.annulation = false;
      }
      else
        this.annulation = true;

    });
  }
  getIdA(event1) {
    this.idA = event1.data["id"];
    console.log(event1.data["id"]);
    console.log(this.idA);
  }
  add() {

    this.conge2 = this.Rhservice.congeparPersonnelenattente(this.conge["personnel"].personnel_id).subscribe(res => { console.log(this.conge2); });

    console.log(this.conge["personnel"].personnel_id);
    // if (this.conge2 == null) {
    if ((this.personnel["soldeRepos"]) != 0 || (this.personnel["soldeReposN_1"]) != 0 || (this.personnel["soldeReposN_2"]) != 0 || (this.personnel["soldeCompensation"]) != 0 || (this.personnel["soldeExceptionnel"]) != 0)
      if (this.conge["typedeconge"] != "") {
        if (this.conge["datedebut"] != "") {
          if (this.conge["personnel"].personnel_id != "") {
            if (this.conge["numDeJour"] != "") {

              this.Rhservice.ajouterConge(this.conge, this.conge["personnel"].personnel_id).subscribe(res => {
                this.ngOnInit();
                console.log(res);
                console.log(this.conge["datefin"]);
                console.log(this.conge["personnel"].personnel_id);
                this.nombreJourConge = (this.conge["datefin"] - this.conge["datedebut"]) / 86400000;
                this._snackBar.open("demande Conge ajouté avec succés", "OK", {
                  duration: 2000,
                  panelClass: ["green-snackbar"]

                });
              });
            }
            else if (this.conge["numDeMois"] != "") {

              this.Rhservice.ajouterConge(this.conge, this.conge["personnel"].personnel_id).subscribe(res => {
                this.ngOnInit();
                this._snackBar.open("demande Conge ajouté avec succés", "OK", {
                  duration: 2000,
                  panelClass: ["green-snackbar"]

                });
              });
            }
            else if (this.etat === 'other') {

              this.Rhservice.ajouterConge(this.conge, this.conge["personnel"].personnel_id).subscribe(res => {
                this.ngOnInit();
                this._snackBar.open("demande Conge ajouté avec succés", "OK", {
                  duration: 2000,
                  panelClass: ["green-snackbar"]

                });
              });
            }
            else {
              this._snackBar.open(
                "Veuillez Insérer la durée de congé  ",
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
              "Veuillez selectionner Personnel  ",
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
            "Veuillez insérer date de début ",
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
          "Veuillez Selectionner un type de congé ",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    else {
      this._snackBar.open(
        "Solde insuffisant ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }

  delete() {
    console.log(this.id);
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id

      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le Congé à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  AccepterAConge() {
    this.Rhservice.AccepterAConge(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Annulation congé est accepté", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }
  edit(event) {
    if (
      this.Rhservice.updateConge(
        event.data["id"],
        event.data
      ).subscribe(res => {
        console.log("Conge modifié");
        this.ngOnInit();
        this._snackBar.open("Conge modifié avec succés", "OK", {
          duration: 2000
        });
      })
    ) {

    }
  }
  AnnulationConge: object;
  test: object;
  ajouterAnuulationConge() {
    console.log("aaaaaaaaaa" + this.id);


    console.log("oooooooooooooooooooo" + this.annulation);
    if (this.annulation == false) {
      this.Rhservice.ajouterAnnulationConge(this.id).subscribe(res => {
        this.ngOnInit();
        console.log(res);

        if (res != null) {
          this._snackBar.open("demande Annulation Conge ajouté avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]

          });
        }
        else {
          this._snackBar.open("Verifier la début du congé ?", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });


        }
      });


    }
    else {
      this._snackBar.open("Il existe deja une demande d'annulation", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  RefusererAConge() {
    this.Rhservice.RefusererAConge(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Annulation congé est refusé", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }
  RefuserConge() {
    this.Rhservice.RefusererConge(this.id).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande congé est refusé", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }
  AccepterConge() {
    this.Rhservice.AccepterConge(this.id).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande congé est accepté", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }
  etat: any
  onOptionsSelected(event) {
    console.log("hhhhh");
    console.log(this.conge["typedeconge"]);
    if ((this.conge["typedeconge"] == "conge_repos") || (this.conge["typedeconge"] == "conge_compensation") || (this.conge["typedeconge"] == "conge_exceptionnel") || (this.conge["typedeconge"] == "conge_maladie")) {
      this.etat = true;
    }
    else if ((this.conge["typedeconge"] == "mise_a_pied") || (this.conge["typedeconge"] == "detachement")) {
      this.etat = "other";
    }
    else {
      this.etat = false;
    }
    console.log(this.etat);

  }

  columnAnnulationConge = [
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
      headerName: "Conge id",
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
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deleteConge(this.id).subscribe(res => {
        console.log("congee Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
    /* else if (this.idA != null) {
       this.Rhservice.AccepterAConge(this.idA).subscribe(res => {
         console.log("Annulation Congé Accepter");
         this.dialogRef.close();
       }, err => {
         this.message = err.error.message;
       });
     }*/

  }

}