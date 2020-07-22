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
var ListPersonnelsComponent = /** @class */ (function () {
    function ListPersonnelsComponent(http, DirecteurService) {
        this.http = http;
        this.DirecteurService = DirecteurService;
        this.personnel = {
            id_personnel: "",
            nom: "",
            prenom: "",
            sexe: "",
            telephone: "",
            departement: { id_dept: "" },
            grade: { id_grade: "" },
            email: "",
            date_recrutement: ""
        };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nom",
                sortable: true,
                filter: true,
                maxWidth: 150
            },
            {
                headerName: "Prenom",
                field: "prenom",
                sortable: true,
                filter: true,
                maxWidth: 150
            },
            {
                headerName: "Sexe",
                field: "sexe",
                sortable: true,
                filter: true,
                maxWidth: 80
            },
            {
                headerName: "Téléphone",
                field: "telephone",
                sortable: true,
                filter: true,
                maxWidth: 120
            },
            {
                headerName: "Email",
                field: "email",
                sortable: true,
                filter: true
            },
            {
                headerName: "Grade",
                field: "grade.nom_grade",
                sortable: true,
                filter: true
            },
            {
                headerName: "Departement",
                field: "departement.nom_dept",
                sortable: true,
                filter: true
            }
        ];
    }
    ListPersonnelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.DirecteurService.listerPersonnel().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
    };
    ListPersonnelsComponent = __decorate([
        core_1.Component({
            selector: "app-list-personnels",
            templateUrl: "./List-PersonnelsDirecteur.component.html",
            styleUrls: ["./List-PersonnelsDirecteur.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            directeur_service_1.DirecteurService])
    ], ListPersonnelsComponent);
    return ListPersonnelsComponent;
}());
exports.ListPersonnelsComponent = ListPersonnelsComponent;
//# sourceMappingURL=List-PersonnelsDirecteur.component.js.map