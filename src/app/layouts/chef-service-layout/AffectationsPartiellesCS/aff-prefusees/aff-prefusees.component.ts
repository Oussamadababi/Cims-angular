import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChefServiceService } from "../../../../services/ChefService/chef-service.service";
@Component({
  selector: "app-aff-prefusees",
  templateUrl: "./aff-prefusees.component.html",
  styleUrls: ["./aff-prefusees.component.css"]
})
export class AffPrefuseesComponent implements OnInit {
  rowDataP: any;
  /*Etat_AffectationP: any[] = [
      {
        id_etat: "",
        nomEtat: "",
        
      }
    ]; */
  AffectationPartielle: object = {
    idAffect: "",
    dateDebut: "",
    datefin: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" },
    jour: "",
    sujet: "Assistance technique",
    etat: { id_etat: "" }
  };

  constructor(
    private http: HttpClient,
    private CSService: ChefServiceService
  ) { }

  ngOnInit(): void {
    this.CSService.listerAffPRefusées().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });
  }

  columnDefsP = [
    {
      headerName: "ID",
      field: "idAffect",
      sortable: true,
      filter: true,
      maxWidth: 100
    },
    {
      headerName: "personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true
    },

    {
      headerName: "Site",
      field: "site.nomSite",
      sortable: true,
      filter: true,
      maxWidth: 150
    },
    {
      headerName: "Date debut",
      field: "dateDebut",
      sortable: true,
      maxWidth: 130
    },
    {
      headerName: "Date fin",
      field: "datefin",
      sortable: true,
      maxWidth: 130
    },
    {
      headerName: "Jour",
      field: "jour",

      sortable: true,
      filter: true,
      maxWidth: 200
    },
    {
      headerName: "Sujet",
      field: "sujet",
      sortable: true,
      filter: true,
      maxWidth: 170
    },
    {
      headerName: "Etat",
      field: "etat.nom_etat",
      maxWidth: 130,
      sortable: true,
      filter: true,
      cellStyle: { color: "red", fontWeight: 'bold' }
    }
  ];
}
