import { Component, OnInit } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogError } from '../../affectations-totales/affectations-totales.component';


@Component({
  selector: 'app-solde-compensation',
  templateUrl: './solde-compensation.component.html',
  styleUrls: ['./solde-compensation.component.css']
})
export class SoldeCompensationComponent implements OnInit {

  constructor(private Rhservice: RHService, private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }
  personnels: any;
  message: string;
  SoldecompensationA: any;
  personnel: object =
    {
      soldeRepos: ""

    }
  perselecter: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);
    })
  }

  onOptionsSelected() {
    this.Rhservice.getPersonnel(this.perselecter).subscribe(res => {
      var y: any = res;
      console.log(res);
      this.personnel = y;
    });

  }

  add() {
    this.Rhservice.ajoutSoldeCompensation(this.perselecter, this.SoldecompensationA).subscribe(res => {
      console.log(res);
      this.ngOnInit();
      this._snackBar.open("Solde Ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    }, err => {
      this.message = err.error.message;
      this.dialog.open(DialogError, {
        data: this.message
      });

    });




  }


}

