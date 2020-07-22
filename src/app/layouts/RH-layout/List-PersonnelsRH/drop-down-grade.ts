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
    grade: any =
        {
            id_grade: "",
            nom_grade: ""

        }
        ;
    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerGrades().subscribe(data => {
            this.grade = data;
            console.log(this.grade);
        });
        this.params = params;
        this.grade.id_grade = this.params.value;
        console.log(this.grade.id_grade);
        this.grade = params.options;
        console.log(this.grade);

    }

    getValue(): any {

        return this.grade.id_grade;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}