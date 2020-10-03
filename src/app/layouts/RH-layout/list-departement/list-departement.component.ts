import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: "app-list-departement",
  templateUrl: "./list-departement.component.html",
  styleUrls: ["./list-departement.component.css"]
})
export class ListDepartementComponent implements OnInit {
  message: string;
  id: number;
  departement: object = { id_dept: "", direction: "", nom_dept: "" };
  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerDepartements().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
  }
  add() {
    if (this.departement["nom_dept"] != "") {
      this.Rhservice.addDepartement(this.departement).subscribe(res => {
        console.log(res);
        this.ngOnInit();
        this._snackBar.open("Departement ajouté avec succés", "OK", {
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

    } else {
      this._snackBar.open("Veuillez insérer le nom du departement", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_dept"];
    console.log(event.data["id_dept"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateDepartement(
        event.data["id_dept"],
        event.data
      ).subscribe(res => {
        console.log(res);
        this._snackBar.open("Departement modifié avec succés", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });
        this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

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
      this._snackBar.open(
        "Veuillez sélectionner le departement à supprimer",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }
  columnDefs = [
    {
      headerName: "ID",
      valueGetter: "node.rowIndex + 1"
    },
    {
      headerName: "Direction",
      field: "direction",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 500
    },
    {
      headerName: "Nom",
      field: "nom_dept",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 500
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
      this.Rhservice.deleteDepartement(this.id).subscribe(res => {
        console.log("Departement Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }

  }
}

////
///
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