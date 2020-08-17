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
  rowData: any;
  rowData1: any;
  form: FormGroup;
  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })

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
    datefin: "",
    personnel: { personnel_id: "" }
  };

  id: number;
  idA: number;
  nombreJourConge: any;
  getId(event) {
    this.id = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.id);
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
    if (this.conge["typedeconge"] != "") {
      if (this.conge["datedebut"] != "") {
        if (this.conge["datefin"] != "") {
          if (this.conge["personnel"].personnel_id != "") {
            if (this.conge["datedebut"] < this.conge["datefin"]) {

              this.Rhservice.ajouterConge(this.conge, this.conge["personnel"].personnel_id).subscribe(res => {
                this.ngOnInit();
                console.log(res);
                console.log(this.conge["datefin"]);
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
    /*} else {
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
  /* deleteConge() {
     this.Rhservice.deleteConge(this.id).subscribe(res => {
       console.log(res);
       this.ngOnInit();
     });
   
   }*/
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

    /*console.log(this.idA);
    if (this.idA != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.idA
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner l'annulation à accepter", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }*/
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
  ajouterAnuulationConge() {
    this.AnnulationConge = this.Rhservice.annulationCongeenAttente(this.conge["personnel"].personnel_id).subscribe(res => {
    });
    //if (this.AnnulationConge == null) {
    this.Rhservice.ajouterAnnulationConge(this.id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      this._snackBar.open("demande Annulation Conge ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]

      });
    });
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

  /*else {
    this._snackBar.open(
      "il y a une demande d'Annulation encours ",
      "OK",
      {
        duration: 2000,
        panelClass: ["red-snackbar"]
      }
    );

    }
  }
  
  }*/
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