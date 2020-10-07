import { Component, OnInit } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';

@Component({
  selector: 'app-liste-retard-personnel',
  templateUrl: './liste-retard-personnel.component.html',
  styleUrls: ['./liste-retard-personnel.component.css']
})
export class ListeRetardPersonnelComponent implements OnInit {

  constructor(private Rhservice: RHService) { }
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);
    })

  }
  columnDefs = [
    {
      headerName: "Dateetheureretard",
      field: "heureEntree",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }

  ]
  perselecter: any;
  personnel: object;
  onOptionsSelected() {
    this.Rhservice.listRetard(this.perselecter).subscribe(res => {
      var y: any = res;
      console.log(res);
      this.personnel = y;
    });


  }
}

