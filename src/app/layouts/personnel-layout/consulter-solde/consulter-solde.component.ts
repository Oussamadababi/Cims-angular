import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/authentification/token-storage.service';
import { PersonnelService } from "../../../services/Personnel/personnel.service";
@Component({
  selector: 'app-consulter-solde',
  templateUrl: './consulter-solde.component.html',
  styleUrls: ['./consulter-solde.component.css']
})
export class ConsulterSoldeComponent implements OnInit {

  constructor(private http: HttpClient,
    private PersonnelService: PersonnelService,
    private tokenStorage: TokenStorageService) { }
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

}
