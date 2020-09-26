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
  rowData: any;
  ListePASJ: any;
  ngOnInit(): void {
    this.Rhservice.ListePersonnelAbsentSj().subscribe(res => {
      console.log('aaaaaaaaaaaaaaaa' + res[0][0]);
      console.log(res);
      this.rowData = res;
    });
  }
  columnDefs = [
    {
      headerName: "Nom",
      field: "res[0][0]",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "res[0][1]",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Nom Arabe",
      field: "annees[3]",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 180
    },
  ];

}
