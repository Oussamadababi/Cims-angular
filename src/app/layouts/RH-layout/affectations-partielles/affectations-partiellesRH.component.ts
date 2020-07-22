import { Component, OnInit, forwardRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ButtonRendererComponent } from "./button-renderer.component";
import { ButtonOrdreMissionComponent } from "./button-ordre-mission.component";
import { UploadFileService } from "../../../services/uploadFile/upload-file.service";
@Component({
  selector: "app-affectations-partielles",
  templateUrl: "./affectations-partiellesRH.component.html",
  styleUrls: ["./affectations-partiellesRH.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => affectations_partiellesComponent)
    }
  ]
})
export class affectations_partiellesComponent implements OnInit {
  rowDataP: any;
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
  frameworkComponents: any;
  frameworkComponentsOrdre: any;
  id: number;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private fileService: UploadFileService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      buttonOrdre: ButtonOrdreMissionComponent
    };
  }

  ngOnInit(): void {
    this.Rhservice.listerAffP().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });
  }
  getId(event) {
    this.id = event.data["file"].id_file;
    // this.DownloadFile(this.id);
  }
  /* DownloadFile(id_file: number) {
     this.fileService.DownloadFile(id_file).subscribe(res => {
      
       const a = document.createElement('a');
       a.href = URL.createObjectURL(res);
       a.download = "piece_jointe";
       document.body.appendChild(a);
       a.click();
     });
   }*/

  columnDefsP = [
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
      cellRenderer: "buttonRenderer",
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
