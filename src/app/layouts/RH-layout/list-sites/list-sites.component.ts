import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropDownEditor } from "./drop-down-editor";

@Component({
  selector: "app-list-sites",
  templateUrl: "./list-sites.component.html",
  styleUrls: ["./list-sites.component.css"]
})
export class ListSitesComponent implements OnInit {
  id: number;
  gouvernorats: any;
  site: object = {
    id_affectation: "",
    nomSite: "",
    nom_etablissement_fr: "",
    nom_etablissement_ar: "",
    nature_etablissement_fr: "",
    nature_etablissement_ar: "",
    qualite_direction_fr: "",
    qualite_direction_ar: "",
    gouvernorat: { idGouvernorat: "" }
  };
  message: string;
  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerSite().subscribe(res => {
      console.log(res);
      this.rowData = res;
      console.log(this.site["gouvernorat"].idGouvernorat);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      this.gouvernorats = data;
    });

  }
  add() {
    console.log(this.site["gouvernorat"].idGouvernorat);
    console.log(this.site["gouvernorat"].idGouvernorat);
    console.log(this.site["gouvernorat"].idGouvernorat);
    if (this.site["nomSite"] != "") {
      if (this.site["gouvernorat"].idGouvernorat != "") {
        if (this.site["nom_etablissement_fr"] != "") {
          if (this.site["nom_etablissement_ar"] != "") {
            if (this.site["nature_etablissement_fr"] != "") {
              if (this.site["nature_etablissement_ar"] != "") {
                if (this.site["qualite_direction_fr"] != "") {
                  if (this.site["qualite_direction_ar"] != "") {
                    /*      for (let prop in this.site) {
                            /*   if (typeof this.site[prop] == "string") {
                                 if (!this.site[prop]) return alert(prop + " is Required");
                               } else {
                                 if (this.site[prop] == {}) return alert(prop + "is Required");
                               }
                  }*/
                    this.Rhservice.addSite(this.site, this.site["gouvernorat"].idGouvernorat).subscribe(res => {
                      console.log(res);
                      this.ngOnInit();
                      this._snackBar.open("Site ajouté avec succés", "OK", {
                        duration: 2000,
                        panelClass: ["green-snackbar"]
                      });
                    }, err => {
                      this.message = err.error.message;
                      this.dialog.open(DialogError, {
                        data: this.message
                      });
                      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

                    });
                  }
                  else {
                    this._snackBar.open(
                      "Veuillez sélectionner la qualité direction en Ar du site",
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
                    "Veuillez sélectionner la qualité direction en Fr du site",
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
                  "Veuillez sélectionner la nature etablissement en Ar du site",
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
                "Veuillez sélectionner la nature etablissement en Fr du site",
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
              "Veuillez sélectionner le nom etablissement en Ar du site",
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
            "Veuillez sélectionner le nom etablissement en fr du site",
            "OK",
            {
              duration: 2000,
              panelClass: ["red-snackbar"]
            }
          );


        }

      } else {
        this._snackBar.open(
          "Veuillez sélectionner le gouvernorat du site",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du site", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_affectation"];
    console.log(event.data["id_affectation"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateSite(event.data["idSite"], event.data).subscribe(
        res => {
          console.log("Site modifié");
          this.ngOnInit();
          this._snackBar.open("Site modifié avec succés", "OK", {
            duration: 2000
          });
        }, err => {
          this.message = err.error.message;
          this.dialog.open(DialogError, {
            data: this.message
          });
          this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

        }
      )
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
      this._snackBar.open("Veuillez sélectionner le site à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  columnDefs = [

    {
      headerName: "Nom",
      field: "nomSite",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300
    },
    {
      headerName: "Nom Etablissement Fr",
      field: "nom_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Nom Etablissement Ar",
      field: "nom_etablissement_ar",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Nature etablissement fr",
      field: "nature_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Qualite direction fr",
      field: "qualite_direction_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Gouvernorat",
      field: "gouvernorat.nomGouv",
      valueSetter: function (params) {
        params.data.gouvernorat.idGouv = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 320,
      cellEditorFramework: DropDownEditor,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }



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
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deleteSite(this.id).subscribe(res => {
        console.log("Site Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
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