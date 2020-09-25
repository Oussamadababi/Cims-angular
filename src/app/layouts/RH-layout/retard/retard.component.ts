import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { DatePipe } from '@angular/common';
import { RHService } from 'app/services/RH/rhservice.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-retard',
  templateUrl: './retard.component.html',
  styleUrls: ['./retard.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: DatePipe }

  ]
})
export class RetardComponent implements OnInit {

  constructor(private Rhservice: RHService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  public minDate: Date = new Date("05/07/2017 2:00 AM");
  public maxDate: Date = new Date("05/27/2017 11:00 AM");
  public dateValue: Date = new Date("05/16/2017 5:00 AM");
  time = { hour: 13, minute: 30 };
  retard: object = {
    datedujour: "",
    heure: "",
    personnel: { personnel_id: "" }
  };
  rowData: any;
  rowData1: any;
  d: any;
  dateSelect: any;
  onOptionsSelected() {
    console.log("ggggg");
    this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd hh:mm:ss')
    console.log("ggggg");
    this.Rhservice.getPersonnelRetard(this.d).subscribe(res => {
      var y: any = res;
      this.rowData = y;
    });
    this.Rhservice.getPersonnelnonRetard(this.d).subscribe(res => {
      var y: any = res;
      this.rowData1 = y;
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
      headerName: "Justificatif",
      field: "",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    }
  ]
  /*add() {
    if (this.retard["personnel"].personnel_id != "") {
      this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd');
      console.log(this.d);
      this.Rhservice.ajouterAbsence(this.retard["personnel"].personnel_id, this.d).subscribe(res => {
        console.log(res);
        this.Rhservice.getPersonnelRetard(this.d).subscribe(res => {
          var y: any = res;
          this.rowData = y;
        });
        this.Rhservice.getPersonnelnonRetard(this.d).subscribe(res => {
          var y: any = res;
          this.rowData1 = y;
        });

        this._snackBar.open("Personnel ajouté au liste d'absences", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]

        });
      });
    }
    else {
      this._snackBar.open(
        "Veuillez Insérer nom Personnel ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }*/
}
