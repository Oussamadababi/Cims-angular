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
var directeur_service_1 = require("../../../services/Directeur/directeur.service");
var forms_1 = require("@angular/forms");
var button_renderer_component_1 = require("./button-renderer.component");
var datePicker_1 = require("../../chef-service-layout/AffectationsPartiellesCS/datePicker");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var AffectationsPartiellesDirecteurComponent = /** @class */ (function () {
    function AffectationsPartiellesDirecteurComponent(http, DirecteurService) {
        this.http = http;
        this.DirecteurService = DirecteurService;
        this.OrdreAffectationP = {
            idO_Aff: ""
        };
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
        /*jours: Array<string> = ["Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi"
          
        ];*/
        this.AffectationPartielle = {
            idAffect: "",
            dateDebut: "",
            datefin: "",
            site: { idSite: "" },
            personnel: { id_personnel: "" },
            jour: this.jours,
            sujet: "Assistance technique",
            etat: { id_etat: "" },
            OrdreAffectationP: {
                idO_Aff: ""
            }
        };
        this.dateFilter = function (date) {
            var d = new Date(date);
            var day = d.getDay();
            return day !== 0;
        };
        this.columnDefsP = [
            {
                headerName: "Ordre de mission",
                cellRenderer: "buttonRenderer",
                cellRendererParams: {
                    onClick: this.onBtnClick1.bind(this),
                    label: "Ordre d'aff"
                }
            },
            {
                headerName: "ID",
                field: "idAffect",
                sortable: true,
                filter: true,
                minWidth: 100
            },
            {
                headerName: "personnel",
                colId: "personnel.nom & personnel.prenom",
                valueGetter: function (params) {
                    return params.data.personnel.nom + " " + params.data.personnel.prenom;
                },
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Site",
                field: "site.nomSite",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 150
            },
            {
                headerName: "Date debut",
                field: "dateDebut",
                sortable: true,
                editable: true,
                maxWidth: 150,
                filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        var dateParts = dateAsString.split("/");
                        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    }
                }
            },
            {
                headerName: "Date fin",
                field: "datefin",
                sortable: true,
                filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        var dateParts = dateAsString.split("/");
                        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    },
                    editable: true,
                    maxWidth: 150
                }
            },
            {
                headerName: "Jour",
                field: "jour",
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
                },
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 150
            },
            {
                headerName: "Sujet",
                field: "sujet",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Etat",
                field: "etat.nom_etat",
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: ["VALIDEE", "REFUSEE"]
                },
                sortable: true,
                filter: true,
                editable: true
            }
        ];
        var myDate = new Date();
        this.minDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + 3);
        this.frameworkComponents = { buttonRenderer: button_renderer_component_1.ButtonRendererComponent };
    }
    AffectationsPartiellesDirecteurComponent_1 = AffectationsPartiellesDirecteurComponent;
    AffectationsPartiellesDirecteurComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.DirecteurService.listerAffP().subscribe(function (res) {
            console.log(res);
            _this.rowDataP = res;
        });
        this.DirecteurService.listerPersonnel().subscribe(function (data) {
            _this.personnel = data;
            console.dir(data);
        });
        this.DirecteurService.listerGouvernorats().subscribe(function (data) {
            var x = data;
            _this.gouvernorat = x;
            console.log(_this.gouvernorat[0]);
        });
        this.DirecteurService.listerPersonnelAyantAffT().subscribe(function (data) {
            _this.personnel = data;
            console.dir(data);
        });
    };
    AffectationsPartiellesDirecteurComponent.prototype.onOptionsSelected = function () {
        var _this = this;
        this.DirecteurService.getSitesParGouv(this.gouvselecter).subscribe(function (res) {
            var y = res;
            _this.site = y;
        });
    };
    AffectationsPartiellesDirecteurComponent.prototype.addP = function () {
        var _this = this;
        this.DirecteurService.addAffP(this.AffectationPartielle).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.dir(this.AffectationPartielle);
    };
    AffectationsPartiellesDirecteurComponent.prototype.getId = function (event) {
        this.id = event.data["idAffect"];
        //console.log(event.data["idAffect"]);
        //console.log(this.id);
    };
    AffectationsPartiellesDirecteurComponent.prototype.edit = function (event) {
        console.log(event.data);
        if (event.data.etat.id_etat == 1) {
            if (event.data.etat.nom_etat == "VALIDEE") {
                event.data.etat.id_etat = 2;
            }
            if (event.data.etat.nom_etat == "REFUSEE") {
                event.data.etat.id_etat = 3;
            }
            this.DirecteurService.updateAffectationP(event.data["idAffect"], event.data).subscribe(function (res) {
                console.log("Affectation modifiée");
            });
        }
        else {
            console.log("impossible de modifier");
        }
    };
    AffectationsPartiellesDirecteurComponent.prototype.delete = function () {
        var _this = this;
        this.DirecteurService.deleteAffectationP(this.id).subscribe(function (res) {
            console.log("Affectation partielle Supprimée");
            _this.ngOnInit();
        });
    };
    AffectationsPartiellesDirecteurComponent.prototype.getOrdreOfAff = function () {
        var _this = this;
        this.DirecteurService.getOrdreOfAff(this.id).subscribe(function (data) {
            _this.OrdreAffectationP = data;
            console.log(_this.OrdreAffectationP);
        });
        this.pdfAffReport(this.OrdreAffectationP["idO_Aff"]);
    };
    AffectationsPartiellesDirecteurComponent.prototype.pdfAffReport = function (idOAff) {
        this.DirecteurService.pdfAffReport(idOAff).subscribe(function (res) {
            var file = new Blob([res], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log("PDF AffectationP");
        });
    };
    AffectationsPartiellesDirecteurComponent.prototype.onBtnClick1 = function (e) {
        this.getOrdreOfAff();
    };
    var AffectationsPartiellesDirecteurComponent_1;
    AffectationsPartiellesDirecteurComponent = AffectationsPartiellesDirecteurComponent_1 = __decorate([
        core_1.Component({
            selector: "app-AffectationsPartiellesDirecteur",
            templateUrl: "./AffectationsPartiellesDirecteur.component.html",
            styleUrls: ["./AffectationsPartiellesDirecteur.component.css"],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: core_1.forwardRef(function () { return AffectationsPartiellesDirecteurComponent_1; })
                },
                { provide: core_2.MAT_DATE_LOCALE, useValue: "fr-FR" },
                { provide: core_2.MAT_DATE_FORMATS, useValue: material_moment_adapter_1.MAT_MOMENT_DATE_FORMATS },
                { provide: core_2.DateAdapter, useClass: datePicker_1.MomentUtcDateAdapter }
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            directeur_service_1.DirecteurService])
    ], AffectationsPartiellesDirecteurComponent);
    return AffectationsPartiellesDirecteurComponent;
}());
exports.AffectationsPartiellesDirecteurComponent = AffectationsPartiellesDirecteurComponent;
//# sourceMappingURL=AffectationsPartiellesDirecteur.component.js.map