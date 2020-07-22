import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { DirecteurService } from "../../../../services/Directeur/directeur.service";

@Component({
  selector: "app-button-renderer",
  template: `
    <button (click)="imprimer()" mat-flat-button>
      <i class="material-icons">
        print
      </i>
    </button>
  `
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  OrdreAffectationP: any = {
    idO_Aff: ""
  };
  id: number;

  agInit(params): void {
    this.params = params;
    this.DirecteurService.getOrdreOfAff(this.params.data.idAffect).subscribe(
      data => {
        this.OrdreAffectationP = data;
        this.id = this.OrdreAffectationP.idO_Aff;
      }
    );
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private DirecteurService: DirecteurService) {}

  imprimer() {
    console.log(this.id);
    this.DirecteurService.pdfAffReport(this.id).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF AffectationP");
    });
  }
}
