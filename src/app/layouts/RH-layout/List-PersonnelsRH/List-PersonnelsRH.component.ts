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
  gouvselecter: any;
  divselect: any;
  idAfffff: any;
  idfonction: any;
  id_grade: any;

  personnel: object = {
    id_personnel: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    departement: { id_dept: "" },
    email: "",
    date_recrutement: "",
    matricule: "",
    matricule_CNRPS: "",
    matricule_CNSS: "",
    prenom_AR: "",
    poste_Occupe: "",
    date_Promotion: "",
    soldeRepos: "",
    date_Naissance: "",
    adresse: "",
    affectation: { affectation_id: "" },
    fonction: { id_fonction: "" },
    division: { id_division: "" },
    nom_AR: "",
    grade: { id_grade: "" }



  };
  grades: any;
  sites: any;
  fonction: any;
  divisions: any;
  services: any;
  attributfonction: object = {
    type_fonction: ""
  };
  attributAffectation: object = {
    nature: "",
    qualite: "",
    gouvernorat: ""
  };


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
      /* this.departement = data;
       console.dir(data);*/
      var x: any = data;
      this.departement = x;
      console.log(this.departement[0]);
    });
    this.Rhservice.listFonctions().subscribe(data => {
      this.fonction = data;
      console.dir(data);
    });

  }

  onOptionsSelected() {
    this.Rhservice.listDivisions(this.gouvselecter).subscribe(res => {
      var y: any = res;
      this.divisions = y;
    });


  }
  onOptionsSelected1() {
    this.Rhservice.listService(this.divselect).subscribe(res => {
      var y: any = res;
      this.services = y;
    });
  }
  onOptionSAffectation() {
    console.log(this.sites);
    this.Rhservice.listAttparAff(this.idAfffff).subscribe(res => {
      var y: any = res;
      console.log(res);
      console.log(this.attributAffectation);
      this.attributAffectation = y;
    });
  }
  onOptionFonction() {
    this.Rhservice.getAttFonction(this.idfonction).subscribe(res => {
      var y: any = res;
      console.log(res);
      console.log(this.attributfonction);
      this.attributfonction = y;
    });
  }

  add() {
    if (this.personnel["nom"] != "") {
      if (this.personnel["prenom"] != "") {
        if (this.personnel["nom_AR"] != "") {
          if (this.personnel["prenom_AR"] != "") {
            if (this.personnel["sexe"] != "") {
              if (this.personnel["date_Naissance"] != "") {
                if (this.personnel["adresse"] != "") {
                  if (this.personnel["telephone"] != "") {
                    if (this.personnel["email"] != "") {
                      if (this.personnel["date_recrutement"] != "") {
                        if (this.personnel["matricule"] != "") {
                          if (this.personnel["matricule_CNSS"] != "") {
                            if (this.personnel["matricule_CNRPS"] != "") {
                              if (this.personnel["date_Promotion"] != "") {
                                if (this.personnel["poste_Occupe"] != "") {
                                  if (this.personnel["soldeRepos"] != "") {
                                    if (this.id_grade != "") {
                                      if (this.idAfffff != "") {
                                        if (this.gouvselecter != "") {
                                          if (this.divselect != "") {
                                            if (this.personnel["division"].id_division != "") {
                                              if (this.idfonction != "") {
                                                this.Rhservice.addPersonnel2(this.personnel, this.id_grade, this.idfonction, this.gouvselecter, this.idAfffff, this.personnel["division"].id_division, this.divselect).subscribe(res => {
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
                                                  "Veuillez une Fonction  ",
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
                                                "Veuillez une Division    ",
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
                                              "Veuillez une Division  ",
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
                                            "Veuillez une Structure  ",
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
                                          "Veuillez une Affectation  ",
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
                                        "Veuillez selectionner une grade  ",
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
                                      "Veuillez insérer la Solde initial du personnel ",
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
                                    "Veuillez insérer la poste occupé du personnel ",
                                    "OK",
                                    {
                                      duration: 2000,
                                      panelClass: ["red-snackbar"]
                                    }
                                  );

                                }

                              } else {
                                this._snackBar.open(
                                  "Veuillez selectionner la date de promotion du personnel ",
                                  "OK",
                                  {
                                    duration: 2000,
                                    panelClass: ["red-snackbar"]
                                  }
                                );
                              }
                            } else {
                              this._snackBar.open(
                                "Veuillez insérer la Matricule CNRPS du personnel ",
                                "OK",
                                {
                                  duration: 2000,
                                  panelClass: ["red-snackbar"]
                                }
                              );
                            }
                          } else {
                            this._snackBar.open(
                              "Veuillez insérer la Matricule CNSS du personnel ",
                              "OK",
                              {
                                duration: 2000,
                                panelClass: ["red-snackbar"]
                              }
                            );
                          }
                        } else {
                          this._snackBar.open(
                            "Veuillez insérer la cin du personnel ",
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
                          "Veuillez sélectionner la date de recrutement du personnel ",
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
                      "Veuillez insérer le telephone du personnel ",
                      "OK",
                      {
                        duration: 2000,
                        panelClass: ["red-snackbar"]
                      }
                    );
                  }

                } else {
                  this._snackBar.open(
                    "Veuillez insérer Adresse du personnel ",
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
                  "Veuillez sélectionner le DateNaissance du personnel ",
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
            this._snackBar.open("Veuillez insérer le Prenom du personnel en Arabe", "OK", {
              duration: 2000,
              panelClass: ["red-snackbar"]
            });
          }
        } else {
          this._snackBar.open("Veuillez insérer le Nom du personnel en Arabe ", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });
        }
      } else {
        this._snackBar.open("Veuillez insérer le prenom du personnel", "OK", {
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
      maxWidth: 200
    },
    {
      headerName: "SoldeRepos",
      field: "soldeRepos",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Grade",
      field: "grade.nom_grade_fr",
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

/////////

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