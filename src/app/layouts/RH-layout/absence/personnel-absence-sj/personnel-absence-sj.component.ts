import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RHService } from 'app/services/RH/rhservice.service';
import { DropDownEditorGrade } from '../../List-PersonnelsRH/drop-down-grade';
import { DropDownEditorDept } from '../../List-PersonnelsRH/drop-down-dept';



@Component({
  selector: 'app-personnel-absence-sj',
  templateUrl: './personnel-absence-sj.component.html',
  styleUrls: ['./personnel-absence-sj.component.css']
})
export class PersonnelAbsenceSJComponent implements OnInit {

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }
  idA: number;
  rowData: any;
  ListePASJ: any;
  ngOnInit(): void {
    this.Rhservice.ListePersonnelAbsentSj().subscribe(res => {

      this.rowData = res;
    });
  }
  columnDefs = [
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 180
    },
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
      maxWidth: 150
    },
    {
      headerName: "Mail Reçu",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 250
    }

  ];
  getIdA(event) {
    this.idA = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.idA);
  }
  JustifierAbsence() {
    if (this.idA != null) {
      this.Rhservice.JustifierAbsence(this.idA).subscribe(res => {
        this.ngOnInit();

      });
    }
    else {
      this._snackBar.open(
        "Sélectionner une absence pour le justifier ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }



  }

}
