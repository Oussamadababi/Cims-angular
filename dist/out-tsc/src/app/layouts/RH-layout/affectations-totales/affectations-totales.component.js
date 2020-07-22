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
var rhservice_service_1 = require("../../../services/RH/rhservice.service");
var http_1 = require("@angular/common/http");
var AffectationsTotalesComponent = /** @class */ (function () {
    function AffectationsTotalesComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.site = [
            {
                idSite: "",
                nomSite: "",
                gouvernorat: {
                    idGouv: ""
                }
            }
        ];
        this.gouvernorat = [
            {
                idGouv: "",
                nomGouv: ""
            }
        ];
        this.AffectationTotale = {
            idAffectT: "",
            site: { idSite: "" },
            personnel: { id_personnel: "" }
        };
        this.columnDefsT = [
            {
                headerName: "personnel",
                colId: "personnel.nom & personnel.prenom",
                valueGetter: function (params) {
                    return params.data.personnel.nom + " " + params.data.personnel.prenom;
                },
                sortable: true,
                filter: true
            },
            {
                headerName: "Site",
                field: "site.nomSite",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            }
        ];
    }
    AffectationsTotalesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Rhservice.listerAffTot().subscribe(function (res) {
            console.log(res);
            _this.rowDataT = res;
        });
        this.Rhservice.listerPersonnel().subscribe(function (data) {
            _this.personnel = data;
            console.dir(data);
        });
        this.Rhservice.listerGouvernorats().subscribe(function (data) {
            var x = data;
            _this.gouvernorat = x;
            console.log(_this.gouvernorat[0]);
        });
    };
    AffectationsTotalesComponent.prototype.onOptionsSelected = function () {
        var _this = this;
        this.Rhservice.getSitesParGouv(this.gouvselecter).subscribe(function (res) {
            var y = res;
            _this.site = y;
        });
    };
    AffectationsTotalesComponent.prototype.addT = function () {
        var _this = this;
        this.Rhservice.addAffTot(this.AffectationTotale).subscribe(function (res) {
            console.log(_this.AffectationTotale);
            _this.ngOnInit();
        });
        console.dir(this.AffectationTotale);
    };
    AffectationsTotalesComponent.prototype.getId = function (event) {
        this.id = event.data["idAffectT"];
        console.log(event.data["idAffectT"]);
        console.log(this.id);
    };
    AffectationsTotalesComponent.prototype.edit = function (event) {
        this.Rhservice.updateAffTot(event.data["idAffectT"], event.data).subscribe(function (res) {
            console.log("Affectation modifiée");
        });
    };
    AffectationsTotalesComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deleteAffTot(this.id).subscribe(function (res) {
            console.log("Affectation Supprimée");
            _this.ngOnInit();
        });
    };
    AffectationsTotalesComponent = __decorate([
        core_1.Component({
            selector: "app-affectations-totales",
            templateUrl: "./affectations-totales.component.html",
            styleUrls: ["./affectations-totales.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], AffectationsTotalesComponent);
    return AffectationsTotalesComponent;
}());
exports.AffectationsTotalesComponent = AffectationsTotalesComponent;
//# sourceMappingURL=affectations-totales.component.js.map