import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { UploadFileService } from "../../../../services/uploadFile/upload-file.service";

@Component({
  selector: "app-button-piece-jointe",
  template: `
    <button (click)="download()" mat-flat-button>
      <i class="material-icons">
        get_app
      </i>
    </button>
  `
})
export class ButtonPieceJointeComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params): void {
    this.params = params;
    console.log(this.params);
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private fileService: UploadFileService) {}
  download() {
    console.log(this.params.data.file.id_file);
    this.fileService
      .DownloadFile(this.params.data.file.id_file)
      .subscribe(res => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = "piece_jointe";
        document.body.appendChild(a);
        a.click();
      });
  }
}
