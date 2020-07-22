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
var ListSitesComponent = /** @class */ (function () {
    function ListSitesComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.site = {
            nomSite: "",
            gouvernorat: { idGouv: "" }
        };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nomSite",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Gouvernorat",
                field: "gouvernorat.nomGouv",
                sortable: true,
                filter: true,
                editable: true
            }
        ];
    }
    ListSitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addsite = false;
        this.Rhservice.listerSite().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
        this.Rhservice.listerGouvernorats().subscribe(function (data) {
            _this.gouvernorat = data;
            console.dir(data);
        });
    };
    ListSitesComponent.prototype.add = function () {
        var _this = this;
        console.dir(this.site);
        for (var prop in this.site) {
            if (typeof this.site[prop] == "string") {
                if (!this.site[prop])
                    return alert(prop + " is Required");
            }
            else {
                if (this.site[prop] == {})
                    return alert(prop + "is Required");
            }
        }
        this.Rhservice.addSite(this.site).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.log(this.site);
    };
    ListSitesComponent.prototype.getId = function (event) {
        this.id = event.data["idSite"];
        console.log(event.data["idSite"]);
        console.log(this.id);
    };
    ListSitesComponent.prototype.edit = function (event) {
        this.Rhservice.updateSite(event.data["idSite"], event.data).subscribe(function (res) {
            console.log("Site modifié");
        });
        //console.log(event.data["idSite"]);
    };
    ListSitesComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deleteSite(this.id).subscribe(function (res) {
            console.log("Site Supprimé");
            _this.ngOnInit();
        });
    };
    ListSitesComponent.prototype.displayaddsite = function () {
        this.addsite = true;
    };
    ListSitesComponent.prototype.cancel = function () {
        this.addsite = false;
    };
    ListSitesComponent = __decorate([
        core_1.Component({
            selector: "app-list-sites",
            templateUrl: "./list-sites.component.html",
            styleUrls: ["./list-sites.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListSitesComponent);
    return ListSitesComponent;
}());
exports.ListSitesComponent = ListSitesComponent;
//# sourceMappingURL=list-sites.component.js.map