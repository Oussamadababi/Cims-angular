import { Component, OnInit } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: DatePipe }

  ]
})
export class AbsenceComponent implements OnInit {

  constructor(private Rhservice: RHService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);

    });
  }
  absence: object = {
    datedujour: "",
    personnel: { personnel_id: "" }
  };
  d: any;
  add() {

    this.d = this.datePipe.transform(this.absence["datedujour"], 'yyyy-MM-dd');
    console.log(this.d);
    this.Rhservice.ajouterAbsence(this.absence["personnel"].personnel_id, this.d).subscribe(res => {
      console.log(res);

      this._snackBar.open("demandeConge ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]

      });
    });
  }

}
