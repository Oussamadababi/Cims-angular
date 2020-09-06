import { Component, OnInit } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';

@Component({
  selector: 'app-consulter-solde',
  templateUrl: './consulter-solde.component.html',
  styleUrls: ['./consulter-solde.component.css']
})
export class ConsulterSoldeComponent implements OnInit {

  constructor(private Rhservice: RHService) { }
  personnels: any;
  rowData: any;
  perselecter: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;
      console.dir(data);
    })
  }
  onOptionsSelected() {
    this.Rhservice.getPersonnel(this.perselecter).subscribe(res => {
      var y: any = res;
      this.rowData = y;
    });


  }
  columnDefs = [
    {
      headerName: "Solde",
      field: "nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "SoldeN-1",
      field: "prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "SoldeN-2",
      field: "sexe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 100
    },
    {
      headerName: "SoldeExeceptionnel",
      field: "telephone",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
  ]
}
