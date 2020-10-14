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
      id_personnel: "",
      nom: "",
      prenom: "",
      sexe: "",
      telephone: "",
      departement: { id_dept: "" },
      email: "",
      date_recrutement: "",
      matricule: "",
      matricule_CNRPS: "",
      matricule_CNSS: "",
      prenom_AR: "",
      poste_Occupe: "",
      date_Promotion: "",
      soldeRepos: "",
      date_Naissance: "",
      adresse: "",
      affectation: { affectation_id: "" },
      fonction: { id_fonction: "" },
      division: { id_division: "" },
      nom_AR: "",
      grade: { id_grade: "" },
      date_fonction: "",
      soldeReposN_1: "",
      soldeReposN_2: "",
      soldeCompensation: "",

    }
  rowData: any;
  perselecter: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
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
      headerName: "Matricule",
      field: "matricule",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Solde Repos1",
      field: "soldeReposN_1",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "SoldeRepos2",
      field: "soldeReposN_2",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Compensation",
      field: "soldeCompensation",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 300
    }

  ];



}
