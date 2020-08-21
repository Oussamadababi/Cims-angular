import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-list-grades",
  templateUrl: "./list-grades.component.html",
  styleUrls: ["./list-grades.component.css"]
})
export class ListGradesComponent implements OnInit {
  message: string;
  id: number;
  grade: object = { id_grade: "", nom_grade_fr: "" };
  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerGrades().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
  }
  add() {
    if (this.grade["nom_grade_fr"] != "") {
      this.Rhservice.addGrade(this.grade).subscribe(res => {
        console.log(res);
        this.ngOnInit();
        this._snackBar.open("Grade ajouté avec succés", "OK", {
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
      this._snackBar.open("Veuillez insérer le nom du grade", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_grade"];
    console.log(event.data["id_grade"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateGrade(event.data["id_grade"], event.data).subscribe(
        res => {
          console.log("Grade modifié");
          this._snackBar.open("Grade modifié avec succés", "OK", {
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
      this._snackBar.open("Veuillez sélectionner le grade à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  columnDefs = [
    {
      headerName: "ID",
      valueGetter: "node.rowIndex + 1"
    },
    {
      headerName: "Nom",
      field: "nom_grade_fr",
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
      this.Rhservice.deleteGrade(this.id).subscribe(res => {
        console.log("Grade Supprimé");

        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }

  }
}
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