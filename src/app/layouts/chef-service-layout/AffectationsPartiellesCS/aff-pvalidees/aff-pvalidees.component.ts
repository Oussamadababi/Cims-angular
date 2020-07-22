import { Component, OnInit, forwardRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DirecteurService } from "../../../../services/Directeur/directeur.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ButtonRendererComponent } from "./button-renderer.component";
import { ChefServiceService } from "../../../../services/ChefService/chef-service.service";
import { UploadFileService } from "../../../../services/uploadFile/upload-file.service";
import { ButtonOrdreMissionComponent } from "./button-ordre-mission.component";
import { ButtonPieceJointeComponent } from "./button-piece-jointe.component";
@Component({
  selector: "app-aff-pvalidees",
  templateUrl: "./aff-pvalidees.component.html",
  styleUrls: ["./aff-pvalidees.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AffPValideesComponent)
    }
  ]
})
export class AffPValideesComponent implements OnInit {
  rowDataP: any;
  rowDataMissAcc: any;
  id: number;
  OrdreAffectationP: any = {
    idO_Aff: ""
  };
  jours: string[] = [];
  AffectationPartielle: any = {
    idAffect: "",
    dateDebut: "",
    datefin: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" },
    jour: this.jours,
    sujet: "Assistance technique",
    etat: { id_etat: "" },
    OrdreAffectationP: {
      idO_Aff: ""
    }
  };
  Mission: any = [
    {
      idMission: "",
      heureDepart: "",
      heureArrivee: "",
      date: "",
      affectationPartielle: {
        idAffect: "",
        personnel: { id_personnel: "", nom: "" },
        site: { nomSite: "" }
      },
      etat_accomplie: "",
      file: { id_file: "" }
    }
  ];
  frameworkComponents: any;
  frameworkComponentsMissionAcc: any;
  constructor(
    private http: HttpClient,
    private DirecteurService: DirecteurService,
    private fileService: UploadFileService
  ) {
    this.frameworkComponents = { buttonRenderer: ButtonRendererComponent };
    this.frameworkComponentsMissionAcc = {
      buttonOrdre: ButtonOrdreMissionComponent,
      buttonPieceJointe: ButtonPieceJointeComponent
    };
  }

  ngOnInit(): void {
    this.DirecteurService.listerAffPValidees().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });
    this.DirecteurService.MissAcc().subscribe(res => {
      console.log(res);
      this.rowDataMissAcc = res;
    });
  }
  getId(event) {
    this.id = event.data["idAffect"];
    //this.getOrdreOfAff(this.id);
  }

  getIdF(event) {
    this.id = event.data["file"].id_file;
    //this.DownloadFile(this.id);
  }
  DownloadFile(id_file: number) {
    this.fileService.DownloadFile(id_file).subscribe(res => {
      /* var file = new Blob([res], { type: "image/jpeg" });
       var fileURL = URL.createObjectURL(file);
       window.open(fileURL);
       console.log(res);*/
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = "piece_jointe";
      document.body.appendChild(a);
      a.click();
    });
  }
  columnDefsP = [
    {
      headerName: "Ordre",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: {}
      },
      maxWidth: 90
    },
    {
      headerName: "ID",
      field: "idAffect",
      sortable: true,
      filter: true,
      maxWidth: 90
    },
    {
      headerName: "Personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function(params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      maxWidth: 150
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
      maxWidth: 180
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
      maxWidth: 120,
      sortable: true,
      filter: true,
      cellStyle: { color: "green", fontWeight: "bold" }
    }
  ];
  columnDefsMissAcc = [
    {
      headerName: "ID M",
      field: "idMission",
      sortable: true,
      filter: true,
      maxWidth: 100
    },
    {
      headerName: "Date de mission",
      field: "date",
      sortable: true,
      filter: true,
      maxWidth: 190
    },
    {
      headerName: "Heure Depart",
      field: "heureDepart",
      sortable: true,
      filter: true,
      maxWidth: 160,
      cellStyle: { color: "#16a6b6", fontWeight: "bold" }
    },
    {
      headerName: "Heure Arrivee",
      field: "heureArrivee",
      sortable: true,
      filter: true,
      maxWidth: 160,
      cellStyle: { color: "#16a6b6", fontWeight: "bold" }
    },
    {
      headerName: "Personnel",
      colId:
        "affectationPartielle.personnel.nom & affectationPartielle.personnel.prenom",
      valueGetter: function(params) {
        return (
          params.data.affectationPartielle.personnel.nom +
          " " +
          params.data.affectationPartielle.personnel.prenom
        );
      },
      sortable: true,
      filter: true,
      maxWidth: 170
    },
    {
      headerName: "Site",
      field: "affectationPartielle.site.nomSite",
      sortable: true,
      filter: true,
      maxWidth: 150
    },
    {
      headerName: "Piece jointe",
      cellRenderer: "buttonPieceJointe",
      cellRendererParams: {
        clicked: {}
      },
      maxWidth: 130
    },
    {
      headerName: "Ordre mission",
      cellRenderer: "buttonOrdre",
      cellRendererParams: {
        clicked: {}
      },
      maxWidth: 150
    }
  ];
}
