import { Component, OnInit, forwardRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { DropDownEditorDept } from "./drop-down-dept";
import { DropDownEditorGrade } from "./drop-down-grade";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-list-personnels",
  templateUrl: "./List-PersonnelsRH.component.html",
  styleUrls: ["./List-PersonnelsRH.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ListPersonnelsComponent)
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class ListPersonnelsComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  message: string;
  id: number;
  grade: any;
  site: any;

  departement: any;
  addpers: boolean;

  personnel: object = {
    id_personnel: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    departement: { id_dept: "" },
    grade: { id_grade: "" },
    email: "",
    date_recrutement: "",
    matricule: "",
    matricule_CNRPS: "",
    matricule_CNSS: "",
    nom_Ar: "",
    prenom_AR: "",
    poste_Occupe: "",
    date_Promotion: "",
    soldeRepos: "",
    date_Naissance: "",
    Adresse: "",
    affectation: { affectation_id: "" }



  };
  grades: any;
  sites: any;

  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addpers = false;
    this.Rhservice.listerPersonnel().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.Rhservice.listerGrades().subscribe(
      data => {
        this.grades = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );
    this.Rhservice.listerSite().subscribe(
      data => {
        this.sites = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );

    this.Rhservice.listerDepartements().subscribe(data => {
      this.departement = data;
      console.dir(data);
    });
  }
  add() {
    if (this.personnel["nom"] != "") {
      if (this.personnel["prenom"] != "") {
        if (this.personnel["sexe"] != "") {
          if (this.personnel["departement"].id_dept != "") {
            if (this.personnel["grade"].id_grade != "") {
              if (this.personnel["telephone"] != "") {
                if (this.personnel["email"] != "") {
                  this.Rhservice.addPersonnel(this.personnel).subscribe(res => {
                    console.log(res);
                    this.ngOnInit();

                    this._snackBar.open("Personnel ajouté avec succés", "OK", {
                      duration: 2000,
                      panelClass: ["green-snackbar"]
                    });
                  }, err => {
                    this.message = err.error.message;
                    this.dialog.open(DialogError, {
                      data: this.message
                    });

                  });

                } else {
                  this._snackBar.open(
                    "Veuillez insérer l'email du personnel ",
                    "OK",
                    {
                      duration: 2000,
                      panelClass: ["red-snackbar"]
                    }
                  );
                }
              } else {
                this._snackBar.open(
                  "Veuillez insérer le num° de telephone du personnel ",
                  "OK",
                  {
                    duration: 2000,
                    panelClass: ["red-snackbar"]
                  }
                );
              }
            } else {
              this._snackBar.open(
                "Veuillez sélectionner le grade du personnel ",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                }
              );
            }
          } else {
            this._snackBar.open(
              "Veuillez sélectionner le departement du personnel ",
              "OK",
              {
                duration: 2000,
                panelClass: ["red-snackbar"]
              }
            );
          }
        } else {
          this._snackBar.open(
            "Veuillez sélectionner le sexe du personnel ",
            "OK",
            {
              duration: 2000,
              panelClass: ["red-snackbar"]
            }
          );
        }
      } else {
        this._snackBar.open("Veuillez insérer le prenom du personnel ", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du personnel", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  getId(event) {
    this.id = event.data["id_personnel"];
    console.log(event.data["id_personnel"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updatePersonnel(
        event.data["id_personnel"],
        event.data
      ).subscribe(res => {
        console.log("Personnel modifié");
        this.ngOnInit();
        this._snackBar.open("Personnel modifié avec succés", "OK", {
          duration: 2000
        });
      })
    ) {

    }
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
  displayaddpers() {
    this.addpers = true;
  }
  cancel() {
    this.addpers = false;
  }

  columnDefs = [
    {
      headerName: "Nom",
      field: "nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Sexe",
      field: "sexe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 100
    },
    {
      headerName: "Téléphone",
      field: "telephone",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 300
    },
    {
      headerName: "Grade",
      field: "grade.nom_grade",
      valueSetter: function (params) {
        params.data.grade.id_grade = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 120,
      cellEditorFramework: DropDownEditorGrade,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
    },

    {
      headerName: "Departement",
      field: "departement.nom_dept",
      valueSetter: function (params) {
        params.data.departement.id_dept = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 170,
      cellEditorFramework: DropDownEditorDept,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
    },
    {
      headerName: "Date de recrutement",
      field: "date_recrutement",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 210
    }
  ];
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
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deletePersonnel(this.id).subscribe(res => {
        console.log("Personnel Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}

//////

@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.html',
})
export class DialogError implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogError>,
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public msg: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.message = this.msg;
  }

}