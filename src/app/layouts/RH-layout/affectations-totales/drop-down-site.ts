import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="site.idSite">
    <mat-option *ngFor="let item of site" [value]="item.idSite"> {{item.nomSite}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorSite implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    site: any =
        {
            idSite: "",
            nomSite: "",
            gouvernorat: {
                idGouv: ""
            }

        }
        ;

    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerSite().subscribe(data => {
            this.site = data;
            console.log(this.site);
        });
        this.params = params;
        this.site.idSite = this.params.value;
        console.log(this.site.idSite);
        this.site = params.options;
        console.log(this.site);

    }

    getValue(): any {

        return this.site.idSite;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}