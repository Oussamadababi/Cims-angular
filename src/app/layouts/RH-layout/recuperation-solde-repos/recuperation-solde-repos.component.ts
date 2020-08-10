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
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperation-solde-repos',
  templateUrl: './recuperation-solde-repos.component.html',
  styleUrls: ['./recuperation-solde-repos.component.css']
})
export class RecuperationSoldeReposComponent implements OnInit {
  form: FormGroup;

  constructor() { }
  personnels: any;
  ngOnInit(): void {
  }

}
