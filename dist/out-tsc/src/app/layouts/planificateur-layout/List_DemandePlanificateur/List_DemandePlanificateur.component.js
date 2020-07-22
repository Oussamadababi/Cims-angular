"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var List_DemandeComponent = /** @class */ (function () {
    function List_DemandeComponent() {
        this.addaff = false;
        this.partiel = "partielle";
        this.columnDefs = [
            { headerName: "Make", field: "make", sortable: true, filter: true },
            { headerName: "Model", field: "model", sortable: true, filter: true },
            { headerName: "Price", field: "price", sortable: true, filter: true }
        ];
        this.rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
    }
    List_DemandeComponent.prototype.ngOnInit = function () { };
    List_DemandeComponent.prototype.displayaddaff = function () {
        this.addaff = true;
    };
    List_DemandeComponent.prototype.cancel = function () {
        this.addaff = false;
    };
    List_DemandeComponent.prototype.ekteb = function () {
        console.log(this.typeaff);
    };
    List_DemandeComponent = __decorate([
        core_1.Component({
            selector: "app-List_DemandePlanificateur",
            templateUrl: "./List_DemandePlanificateur.component.html",
            styleUrls: ["./List_DemandePlanificateur.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], List_DemandeComponent);
    return List_DemandeComponent;
}());
exports.List_DemandeComponent = List_DemandeComponent;
//# sourceMappingURL=List_DemandePlanificateur.component.js.map