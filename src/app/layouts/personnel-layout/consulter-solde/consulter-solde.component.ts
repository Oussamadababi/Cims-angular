import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'app/services/authentification/token-storage.service';
import { RHService } from 'app/services/RH/rhservice.service';
import { PersonnelService } from "../../../services/Personnel/personnel.service";
@Component({
  selector: 'app-consulter-solde',
  templateUrl: './consulter-solde.component.html',
  styleUrls: ['./consulter-solde.component.css']
})
export class ConsulterSoldeComponent implements OnInit {

  constructor(private http: HttpClient,
    private PersonnelService: PersonnelService,
    private tokenStorage: TokenStorageService,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar) { }
  rowData: any;
  personnel: object =
    {
      soldeRepos: "",
      soldeReposN_1: "",
      soldeReposN_2: ""

    }
  ngOnInit(): void {
    this.PersonnelService.getByIdcompte(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.personnel = res;
    });
  }
  RSR: object = {
    personnel: { personnel_id: "" }
  };
  add() {

    console.log(this.RSR["personnel"].personnel_id);
    this.PersonnelService.ajouterRSR(this.RSR, this.tokenStorage.getUser().id).subscribe(res => {
      this.ngOnInit();
      console.log(res);

      this._snackBar.open("Demande De recuperation Solde repos ajouté avec succés", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]
      });
    });
  }

}
