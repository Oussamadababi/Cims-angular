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
var http_1 = require("@angular/common/http");
var rhservice_service_1 = require("../../../services/RH/rhservice.service");
var ListDepartementComponent = /** @class */ (function () {
    function ListDepartementComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.departement = { id_dept: "", nom_dept: "" };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nom_dept",
                sortable: true,
                filter: true,
                editable: true
            }
        ];
    }
    ListDepartementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adddept = false;
        this.Rhservice.listerDepartements().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
    };
    ListDepartementComponent.prototype.add = function () {
        var _this = this;
        this.Rhservice.addDepartement(this.departement).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.log(this.departement);
    };
    ListDepartementComponent.prototype.getId = function (event) {
        this.id = event.data["id_dept"];
        console.log(event.data["id_dept"]);
        console.log(this.id);
    };
    ListDepartementComponent.prototype.edit = function (event) {
        this.Rhservice.updateDepartement(event.data["id_dept"], event.data).subscribe(function (res) {
            console.log("Departement modifié");
        });
    };
    ListDepartementComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deleteDepartement(this.id).subscribe(function (res) {
            console.log("Departement Supprimé");
            _this.ngOnInit();
        });
    };
    ListDepartementComponent.prototype.displayadddept = function () {
        this.adddept = true;
    };
    ListDepartementComponent.prototype.cancel = function () {
        this.adddept = false;
    };
    ListDepartementComponent = __decorate([
        core_1.Component({
            selector: "app-list-departement",
            templateUrl: "./list-departement.component.html",
            styleUrls: ["./list-departement.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListDepartementComponent);
    return ListDepartementComponent;
}());
exports.ListDepartementComponent = ListDepartementComponent;
//# sourceMappingURL=list-departement.component.js.map