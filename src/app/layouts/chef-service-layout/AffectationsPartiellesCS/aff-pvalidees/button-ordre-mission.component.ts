import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { RHService } from "../../../../services/RH/rhservice.service";

@Component({
  selector: "app-button-ordre-mission",
  template: `
    <button (click)="imprimer()" mat-raised-button>
      <i class="material-icons">
        print
      </i>
    </button>
  `
})
export class ButtonOrdreMissionComponent implements ICellRendererAngularComp {
  params: any;
  id: number;
  OrdreMission: any = {
    idO_Miss: ""
  };
  agInit(params): void {
    this.params = params;
    this.Rhservice.getOrdreOfMiss(this.params.data.idMission).subscribe(
      data => {
        this.OrdreMission = data;
        this.id = this.OrdreMission.idO_Miss;
      }
    );
    console.log(this.params);
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private Rhservice: RHService) {}
  imprimer() {
    console.log(this.id);
    this.Rhservice.pdfmissionReport(this.id).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF Mission");
    });
  }
}
