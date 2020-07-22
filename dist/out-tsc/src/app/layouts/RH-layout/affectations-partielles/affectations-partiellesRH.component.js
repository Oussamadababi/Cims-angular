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
var forms_1 = require("@angular/forms");
var affectations_partiellesComponent = /** @class */ (function () {
    function affectations_partiellesComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        /*Etat_AffectationP: any[] = [
          {
            id_etat: "",
            nomEtat: "",
            
          }
        ]; */
        this.AffectationPartielle = {
            idAffect: "",
            dateDebut: "",
            datefin: "",
            site: { idSite: "" },
            personnel: { id_personnel: "" },
            jour: "",
            sujet: "Assistance technique",
            etat: { id_etat: "" }
        };
        this.columnDefsP = [
            {
                headerName: "Personnel",
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
                maxWidth: 120
            },
            {
                headerName: "Date debut",
                field: "dateDebut",
                sortable: true,
                filter: true
            },
            {
                headerName: "Date fin",
                field: "datefin",
                sortable: true,
                filter: true
            },
            {
                headerName: "Jour",
                field: "jour",
                sortable: true,
                filter: true
            },
            {
                headerName: "Sujet",
                field: "sujet",
                sortable: true,
                filter: true
            },
            {
                headerName: "Etat",
                field: "etat.nom_etat",
                sortable: true,
                filter: true
            }
        ];
    }
    affectations_partiellesComponent_1 = affectations_partiellesComponent;
    affectations_partiellesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Rhservice.listerAffP().subscribe(function (res) {
            console.log(res);
            _this.rowDataP = res;
        });
    };
    var affectations_partiellesComponent_1;
    affectations_partiellesComponent = affectations_partiellesComponent_1 = __decorate([
        core_1.Component({
            selector: "app-affectations-partielles",
            templateUrl: "./affectations-partiellesRH.component.html",
            styleUrls: ["./affectations-partiellesRH.component.css"],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: core_1.forwardRef(function () { return affectations_partiellesComponent_1; })
                }
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], affectations_partiellesComponent);
    return affectations_partiellesComponent;
}());
exports.affectations_partiellesComponent = affectations_partiellesComponent;
//# sourceMappingURL=affectations-partiellesRH.component.js.map