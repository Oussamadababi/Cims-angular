import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-List_DemandeDemandeur",
  templateUrl: "./List_DemandeDemandeur.component.html",
  styleUrls: ["./List_DemandeDemandeur.component.css"]
})
export class List_DemandeComponent implements OnInit {
  addaff = false;
  typeaff: any;
  partiel = "partielle";
  constructor() { }

  ngOnInit(): void { }
  displayaddaff() {
    this.addaff = true;
  }
  cancel() {
    this.addaff = false;
  }
  ekteb() {
    console.log(this.typeaff);
  }
  columnDefs = [
    { headerName: "Make", field: "make", sortable: true, filter: true },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true }
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];
}
