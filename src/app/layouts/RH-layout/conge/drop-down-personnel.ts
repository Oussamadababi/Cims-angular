import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="grade.id_grade">
    <mat-option *ngFor="let item of grade" [value]="item.id_grade"> {{item.nom_grade}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorGrade implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    personnel: any =
        {
            personnel_id: "",
            nom: ""

        }
        ;
    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerPersonnel().subscribe(data => {
            this.personnel = data;
            console.log(this.personnel);
        });
        this.params = params;
        this.personnel.personnel_id = this.params.value;
        console.log(this.personnel.personnel_id);
        this.personnel = params.options;
        console.log(this.personnel);

    }

    getValue(): any {

        return this.personnel.personnel_id;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}