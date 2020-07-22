import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="gouv.idGouv">
    <mat-option *ngFor="let item of gouv" [value]="item.idGouv">{{item.idGouv}}- {{item.nomGouv}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditor implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    gouvernorat: any;
    public value: number;
    private options: any;
    gouv: any =
        {
            idGouv: "",
            nomGouv: ""

        }
        ;
    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerGouvernorats().subscribe(data => {
            this.gouv = data;

        });
        this.params = params;
        this.gouv.idGouv = this.params.value;
        console.log(this.gouv.idGouv);
        this.gouv = params.options;
        console.log(this.gouv);

    }

    getValue(): any {

        return this.gouv.idGouv;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}