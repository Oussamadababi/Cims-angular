import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { PersonnelService } from "../../../services/Personnel/personnel.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: "app-Mes_Affectations",
  templateUrl: "./Mes_Affectations.component.html",
  styleUrls: ["./Mes_Affectations.component.css"]
})
export class Mes_AffectationsComponent implements OnInit {
  isChecked: true;
  OrdreAffectationP: any = {
    idO_Aff: ""
  };
  Transport: any;
  OrdreMission: any = {
    idO_Miss: "",
    transport: this.Transport
  };
  Mission: any = [
    {
      idMission: "",
      heureDepart: "",
      heureArrivee: "",
      date: "",
      checked: false,
      etat_accomplie: false
    }
  ];

  AffectationPartielle: any = [
    {
      idAffect: "",
      dateDebut: "",
      datefin: "",
      site: { idSite: "" },
      personnel: { id_personnel: "" },
      jour: "",
      sujet: "Assistance technique",
      OrdreAffectationP: {
        idO_Aff: ""
      },
      opened: false,
      checked: false
    }
  ];
  constructor(
    private HttpClient: HttpClient,
    private PersonnelService: PersonnelService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.PersonnelService.getAffPparPersonnel().subscribe(
      data => {
        this.AffectationPartielle = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  openDialog(id: number) {
    this.dialog.open(DialogElementsExampleDialog, {
      data: id
    });
    console.log(id);
  }

  //automatiquement checké affectation quand tt ses missions sont chechées
  onChange(id: number) {
    var idAff: any;
    this.PersonnelService.getMission(id).subscribe(data => {
      console.log(data["affectationPartielle"].idAffect);
      idAff = data["affectationPartielle"].idAffect;
    });
    var numberOfChildCheckBoxes = $(".cb").length;
    console.log(numberOfChildCheckBoxes);

    $(".cb").change(function () {
      let checkedChildCheckBox = $(".cb:checked").length;
      console.log(checkedChildCheckBox);
      if (checkedChildCheckBox == numberOfChildCheckBoxes) {
        $("#" + idAff + "checkAll").prop("checked", true);
      } else $("#" + idAff + "checkAll").prop("checked", false);
    });
  }
  getMissionParId(id: number) {
    console.log(this.AffectationPartielle);
    this.AffectationPartielle.forEach(element => {
      if (element.idAffect == id) {
        element.opened = !element.opened;
      } else {
        element.opened = false;
      }
    });
    this.PersonnelService.getMissionsparAffect(id).subscribe(data => {
      this.Mission = data;
    });
  }
  getOrdreOfAff(id: number) {
    this.PersonnelService.getOrdreOfAff(id).subscribe(data => {
      this.OrdreAffectationP = data;
      console.log(this.OrdreAffectationP);
      this.pdfAffReport(this.OrdreAffectationP["idO_Aff"]);
    });
  }
  pdfAffReport(idOAff: number) {
    this.PersonnelService.pdfAffReport(idOAff).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF AffectationP");
    });
  }
  getOrdreOfMission(id: number) {
    if (this.Mission["heureDepart"] != "") {
      if (this.Mission["heureArrivee"] != "") {
        // if (this.Mission["OrdreMission"].transport != "") {
        this.PersonnelService.getOrdreOfMiss(id).subscribe(data => {
          this.OrdreMission = data;
          console.log(this.OrdreMission);
          this.pdfmissionReport(this.OrdreMission["idO_Miss"]);
        });

        /*  } else {
          this._snackBar.open(
            "Veuillez inserer le besoin du transport ",
            "OK",
            {
              duration: 2000
            }
          );
        }*/
      } else {
        this._snackBar.open("Veuillez insérer l'heure d'arrivée ", "OK", {
          duration: 2000
        });
      }
    } else {
      this._snackBar.open("Veuillez insérer l'heure du départ", "OK", {
        duration: 2000
      });
    }
  }
  pdfmissionReport(idOM: number) {
    this.PersonnelService.pdfmissionReport(idOM).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF Mission");
    });
  }

  ///

  open(id: number): void {
    this.dialog.open(DialogUpdateMission, {
      width: "400px",
      // height: '400px',
      data: id
    });
    this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
  }
}
import { Observable } from "rxjs";
import { UploadFileService } from "../../../services/uploadFile/upload-file.service";
import { QuerySelector } from "ag-grid";
import { MatSnackBar } from "@angular/material/snack-bar";
import { analytics } from "firebase";
@Component({
  selector: "dialog-elements-example-dialog",
  templateUrl: "dialog-elements-example-dialog.html"
})
export class DialogElementsExampleDialog {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = "";
  fileInfos: Observable<any>;
  Mission: any = [
    {
      idMission: "",
      heureDepart: "",
      heureArrivee: "",
      date: "",
      AffectationPartielle: { idAffect: "" },
      OrdreMission: {
        idO_Miss: ""
      },
      checked: false,
      etat_accomplie: false
    }
  ];

  constructor(
    private uploadService: UploadFileService,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  ngOnInit() {
  }
  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, this.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = "Impossible de télécharger le fichier!";
        this.currentFile = undefined;
      }
    );

  }
}
//
@Component({
  selector: "dialog-update-mission",
  templateUrl: "dialog-update-mission.html"
})
export class DialogUpdateMission implements OnInit {
  Transport: any;
  Deplacement: any;
  Hebergement: any;
  MoyenDeTransport: any;
  etatDM: boolean;
  etatDC: boolean;
  etatDO: boolean;
  etatTM: boolean;
  etatTC: boolean;
  etatTO: boolean;
  etatHM: boolean;
  etatHC: boolean;
  etatHO: boolean;
  etatHN: boolean;
  Mission: any = [
    {
      idMission: "",
      heureDepart: "",
      heureArrivee: "",
      date: ""
    }
  ];
  OrdreMission: any = {
    idO_Miss: "",
    transport: this.Transport,
    deplacement: this.Deplacement,
    hebergement: this.Hebergement,
    moyenDeTransport: this.MoyenDeTransport
  };
  constructor(
    private HttpClient: HttpClient,
    private PersonnelService: PersonnelService,
    public dialogRef: MatDialogRef<DialogUpdateMission>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  ngOnInit() {
    this.PersonnelService.getMission(this.id).subscribe(data => {
      this.Mission = data;
      console.log(data);
    });
    this.PersonnelService.getOrdreOfMiss(this.id).subscribe(data => {
      this.OrdreMission = data;
      if (this.OrdreMission.deplacement == "ORAGANISME_DACCUEIL") {
        this.etatDO = true;
      }
      if (this.OrdreMission.deplacement == "MISSIONNAIRE") {
        this.etatDM = true;
      }
      if (this.OrdreMission.deplacement == "CIMS") {
        this.etatDC = true;
      }
      //TRANSPORT
      if (this.OrdreMission.transport == "ORAGANISME_DACCUEIL") {
        this.etatTO = true;
      }
      if (this.OrdreMission.transport == "MISSIONNAIRE") {
        this.etatTM = true;
      }
      if (this.OrdreMission.transport == "CIMS") {
        this.etatTC = true;
      }
      //hebergement
      if (this.OrdreMission.hebergement == "ORAGANISME_DACCUEIL") {
        this.etatHO = true;
      }
      if (this.OrdreMission.hebergement == "MISSIONNAIRE") {
        this.etatHM = true;
      }
      if (this.OrdreMission.hebergement == "CIMS") {
        this.etatHC = true;
      }
      if (this.OrdreMission.hebergement == "NON") {
        this.etatHN = true;
      }
    });
  }
  UpdateMission(id: number) {
    this.PersonnelService.updateMission(id, this.Mission).subscribe(data => { });
    if (this.Transport == "missionnaire") {
      this.OrdreMission.transport = 0;
      if (this.MoyenDeTransport == "personelle") {
        this.OrdreMission.moyenDeTransport = 0;
      }
      if (this.MoyenDeTransport == "public") {
        this.OrdreMission.moyenDeTransport = 1;
      }
    }
    if (this.Transport == "cims") {
      this.OrdreMission.transport = 1;
    }
    if (this.Transport == "organisme") {
      this.OrdreMission.transport = 2;
    }
    //deplacement
    if (this.Deplacement == "missionnaire") {
      this.OrdreMission.deplacement = 0;
    }
    if (this.Deplacement == "cims") {
      this.OrdreMission.deplacement = 1;
    }
    if (this.Deplacement == "organisme") {
      this.OrdreMission.deplacement = 2;
    }
    //hebergement
    if (this.Hebergement == "missionnaire") {
      this.OrdreMission.hebergement = 0;
    }
    if (this.Hebergement == "cims") {
      this.OrdreMission.hebergement = 1;
    }
    if (this.Hebergement == "organisme") {
      this.OrdreMission.hebergement = 2;
    }
    if (this.Hebergement == "NON") {
      this.OrdreMission.hebergement = 3;
    }

    this.PersonnelService.updateOrdreMission(
      this.OrdreMission.idO_Miss,
      this.OrdreMission
    ).subscribe(data => { });
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
