
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RHService } from 'app/services/RH/rhservice.service';



@Component({
  selector: 'app-update-solde',
  templateUrl: './update-solde.component.html',
  styleUrls: ['./update-solde.component.css']
})
export class UpdateSoldeComponent implements OnInit {

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }
  add() {
    /*this._snackBar.open("les soldes repos de chaque personnel seront transférer aux années précédentes ", "OK", {
      duration: 5000,
      panelClass: ["red-snackbar"]
    });*/
    this.Rhservice.TransferSoldeRtoN_1().subscribe(res => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
      this.ngOnInit();

      this._snackBar.open("Opération finie avec succès", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    });

  }

  ngOnInit(): void {
  }

}
