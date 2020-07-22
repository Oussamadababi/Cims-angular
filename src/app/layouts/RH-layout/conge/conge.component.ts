import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],

})
export class CongeComponent implements OnInit {

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Conge: object = {
    id: "",
    Typedeconge: "",
    datedebut: "",
    datefin: "",
    personnel: { id_personnel: "" }
  };
  matricule: number;
  add() {
    this.Rhservice.ajouterConge(this.Conge, this.matricule).subscribe(res => {
      console.log(res);
      this._snackBar.open("Personnel ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]

      });
    });

  }

}
