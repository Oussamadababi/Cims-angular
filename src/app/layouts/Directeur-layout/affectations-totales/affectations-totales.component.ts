import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DirecteurService } from "../../../services/Directeur/directeur.service";

@Component({
  selector: "app-affectations-totales",
  templateUrl: "./affectations-totales.component.html",
  styleUrls: ["./affectations-totales.component.css"]
})
export class AffectationsTotalesComponent implements OnInit {
  rowDataT: any;
  AffectationTotale: object = {
    idAffectT: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" }
  };
  constructor(
    private http: HttpClient,
    private DirecteurService: DirecteurService
  ) {}

  ngOnInit(): void {
    this.DirecteurService.listerAffTot().subscribe(res => {
      console.log(res);
      this.rowDataT = res;
    });
  }
  columnDefsT = [
    {
      headerName: "personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function(params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      minWidth: 400
    },
    {
      headerName: "Site",
      field: "site.nomSite",
      sortable: true,
      filter: true,
      minWidth: 300
    },
    {
      headerName: "Gouvernorat",
      field: "site.gouvernorat.nomGouv",
      sortable: true,
      filter: true,
      minWidth: 270
    }
  ];
}
