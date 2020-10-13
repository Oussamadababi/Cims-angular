import { Component, OnInit } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';
import { parseTwoDigitYear } from 'moment';

@Component({
  selector: 'app-consulter-solde',
  templateUrl: './consulter-solde.component.html',
  styleUrls: ['./consulter-solde.component.css']
})
export class ConsulterSoldeComponent implements OnInit {
  // today: number = Date.now();
  today: any = new Date().getFullYear();
  //| date:'yyyy'

  //

  constructor(private Rhservice: RHService) { }
  personnels: any;
  personnel: object =
    {
      soldeRepos: "",
      soldeReposN_1: "",
      soldeReposN_2: "",
      soldeCompensation: "",

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
  columnDefs = [
    {
      headerName: "Solde",
      field: "soldeRepos",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "SoldeN-1",
      field: "soldeReposN_1",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "SoldeN-2",
      field: "soldeReposN_2",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 100
    },
    {
      headerName: "Solde Compensation",
      field: "soldeCompensation",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
  ]
}
