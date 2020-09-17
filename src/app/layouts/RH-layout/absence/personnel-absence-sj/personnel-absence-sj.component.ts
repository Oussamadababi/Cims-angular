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
      console.log(res);
      this.rowData = res;
    });
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
      headerName: "Nom Arabe",
      field: "nom_AR",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 180
    },
    {
      headerName: "Prenom Arabe",
      field: "prenom_AR",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 180
    },
    {
      headerName: "Poste Occupe",
      field: "poste_Occupe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 170
    },
  ];

}
