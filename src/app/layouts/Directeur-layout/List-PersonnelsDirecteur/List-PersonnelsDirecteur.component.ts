import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DirecteurService } from "../../../services/Directeur/directeur.service";

@Component({
  selector: "app-list-personnels",
  templateUrl: "./List-PersonnelsDirecteur.component.html",
  styleUrls: ["./List-PersonnelsDirecteur.component.css"]
})
export class ListPersonnelsComponent implements OnInit {
  id: number;
  grade: any;
  departement: any;

  personnel: object = {
    id_personnel: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    departement: { id_dept: "" },
    grade: { id_grade: "" },
    email: "",
    date_recrutement: ""
  };
  rowData: any;
  constructor(
    private http: HttpClient,
    private DirecteurService: DirecteurService
  ) { }

  ngOnInit(): void {
    this.DirecteurService.listerPersonnel().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
  }
  columnDefs = [
    {
      headerName: "Nom",
      field: "nom",
      sortable: true,
      filter: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "prenom",
      sortable: true,
      filter: true,
      maxWidth: 130
    },
    {
      headerName: "Sexe",
      field: "sexe",
      sortable: true,
      filter: true,
      maxWidth: 100
    },
    {
      headerName: "Téléphone",
      field: "telephone",
      sortable: true,
      filter: true,
      maxWidth: 140
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true
    },
    {
      headerName: "Grade",
      field: "grade.nom_grade",
      sortable: true,
      filter: true,
      maxWidth: 120
    },

    {
      headerName: "Departement",
      field: "departement.nom_dept",
      sortable: true,
      filter: true,
      maxWidth: 160
    },
    {
      headerName: "Date de recrutement",
      field: "date_recrutement",
      sortable: true,
      filter: true,
      minWidth: 210
    }
  ];
}
