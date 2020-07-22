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
var chef_service_service_1 = require("../../../services/ChefService/chef-service.service");
var http_1 = require("@angular/common/http");
var AffectationsTotalesComponent = /** @class */ (function () {
    function AffectationsTotalesComponent(http, CS_Service) {
        this.http = http;
        this.CS_Service = CS_Service;
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
                editable: true
            }
        ];
    }
    AffectationsTotalesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.CS_Service.listerAffTot().subscribe(function (res) {
            console.log(res);
            _this.rowDataT = res;
        });
    };
    AffectationsTotalesComponent = __decorate([
        core_1.Component({
            selector: "app-affectations-totales",
            templateUrl: "./affectations-totales.component.html",
            styleUrls: ["./affectations-totales.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            chef_service_service_1.ChefServiceService])
    ], AffectationsTotalesComponent);
    return AffectationsTotalesComponent;
}());
exports.AffectationsTotalesComponent = AffectationsTotalesComponent;
//# sourceMappingURL=affectations-totales.component.js.map