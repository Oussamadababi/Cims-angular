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
var chef_service_service_1 = require("../../../services/ChefService/chef-service.service");
var forms_1 = require("@angular/forms");
var datePicker_1 = require("../../chef-service-layout/AffectationsPartiellesCS/datePicker");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var AffectationsPartiellesCSComponent = /** @class */ (function () {
    function AffectationsPartiellesCSComponent(http, CS_Service) {
        this.http = http;
        this.CS_Service = CS_Service;
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
        this.jours = [];
        this.AffectationPartielle = {
            idAffect: "",
            dateDebut: "",
            datefin: "",
            site: { idSite: "" },
            personnel: { id_personnel: "" },
            jour: this.jours,
            sujet: "Assistance technique",
            etat: { id_etat: "" }
        };
        this.dateFilter = function (date) {
            var d = new Date(date);
            var day = d.getDay();
            return day !== 0;
        };
        this.columnDefsP = [
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
        var myDate = new Date();
        this.minDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + 3);
    }
    AffectationsPartiellesCSComponent_1 = AffectationsPartiellesCSComponent;
    AffectationsPartiellesCSComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.CS_Service.listerAffP().subscribe(function (res) {
            console.log(res);
            _this.rowDataP = res;
        });
        this.CS_Service.listerPersonnel().subscribe(function (data) {
            _this.personnel = data;
            console.dir(data);
        });
        this.CS_Service.listerGouvernorats().subscribe(function (data) {
            var x = data;
            _this.gouvernorat = x;
            console.log(_this.gouvernorat[0]);
        });
        this.CS_Service.listerPersonnelAyantAffT().subscribe(function (data) {
            _this.personnel = data;
            console.dir(data);
        });
    };
    AffectationsPartiellesCSComponent.prototype.onOptionsSelected = function () {
        var _this = this;
        this.CS_Service.getSitesParGouv(this.gouvselecter).subscribe(function (res) {
            var y = res;
            _this.site = y;
        });
    };
    AffectationsPartiellesCSComponent.prototype.addP = function () {
        var _this = this;
        this.CS_Service.addAffP(this.AffectationPartielle).subscribe(function (res) {
            console.log(res);
            alert("Affectation ajoutée!");
            _this.ngOnInit();
        });
        console.dir(this.AffectationPartielle);
    };
    var AffectationsPartiellesCSComponent_1;
    AffectationsPartiellesCSComponent = AffectationsPartiellesCSComponent_1 = __decorate([
        core_1.Component({
            selector: "app-AffectationsPartiellesCS",
            templateUrl: "./AffectationsPartiellesCS.component.html",
            styleUrls: ["./AffectationsPartiellesCS.component.css"],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: core_1.forwardRef(function () { return AffectationsPartiellesCSComponent_1; })
                },
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'fr-FR' },
                { provide: core_2.MAT_DATE_FORMATS, useValue: material_moment_adapter_1.MAT_MOMENT_DATE_FORMATS },
                { provide: core_2.DateAdapter, useClass: datePicker_1.MomentUtcDateAdapter },
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            chef_service_service_1.ChefServiceService])
    ], AffectationsPartiellesCSComponent);
    return AffectationsPartiellesCSComponent;
}());
exports.AffectationsPartiellesCSComponent = AffectationsPartiellesCSComponent;
//# sourceMappingURL=AffectationsPartiellesCS.component.js.map