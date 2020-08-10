import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperation-solde-repos',
  templateUrl: './recuperation-solde-repos.component.html',
  styleUrls: ['./recuperation-solde-repos.component.css']
})
export class RecuperationSoldeReposComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })


  }
  conge2: object;
  RSR: object = {
    personnel: { personnel_id: "" }
  };
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;

    });

  }
  add() {

    console.log(this.RSR["personnel"].personnel_id);
    this.Rhservice.ajouterRSR(this.RSR, this.RSR["personnel"].personnel_id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      console.log(this.RSR["personnel"].personnel_id);
      this._snackBar.open("Demande De recuperation Solde repos ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    });
  }

}
