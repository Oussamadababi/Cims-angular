import { Component, OnInit, Inject } from "@angular/core";
import { RHService } from "../../../services/RH/rhservice.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DropDownEditorSite } from "./drop-down-site";

@Component({
  selector: "app-affectations-totales",
  templateUrl: "./affectations-totales.component.html",
  styleUrls: ["./affectations-totales.component.css"]
})
export class AffectationsTotalesComponent implements OnInit {
  message: string;
  id: number;
  rowDataT: any;
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
  AffectationTotale: object = {
    idAffectT: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" }
  };
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerAffTot().subscribe(res => {
      console.log(res);
      this.rowDataT = res;
    });

    this.Rhservice.listPersonnelsSansAffecT().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      var x: any = data;
      this.gouvernorat = x;
      console.log(this.gouvernorat[0]);
    });
  }
  onOptionsSelected() {
    this.Rhservice.getSitesParGouv(this.gouvselecter).subscribe(res => {
      var y: any = res;
      this.site = y;
    });
  }
  addT() {
    if (this.AffectationTotale["personnel"].id_personnel != "") {
      if (this.AffectationTotale["site"].idSite != "") {
        this.Rhservice.addAffTot(this.AffectationTotale).subscribe(res => {
          console.log(this.AffectationTotale);
          this.ngOnInit();
          this._snackBar.open("Affectation totale ajoutée avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]
          });
        });

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
    this.id = event.data["idAffectT"];
    //console.log(event.data["idAffectT"]);
    //console.log(this.id);
  }
  edit(event) {
    this.Rhservice.updateAffTot(event.data["idAffectT"], event.data).subscribe(
      res => {
        console.log("Affectation modifiée");
        this.ngOnInit();
        this._snackBar.open("Affectation totale modifiée avec succés", "OK", {
          duration: 2000
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });


      }
    );
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
  columnDefsT = [
    {
      headerName: "Personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      minWidth: 400
    },
    {
      headerName: "Site",
      field: "site.nomSite",
      valueSetter: function (params) {
        params.data.site.idSite = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300,
      cellEditorFramework: DropDownEditorSite,
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
      headerName: "Gouvernorat",
      field: "site.gouvernorat.nomGouv",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 300
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
      this.Rhservice.deleteAffTot(this.id).subscribe(res => {
        console.log("Affectation Supprimée");
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