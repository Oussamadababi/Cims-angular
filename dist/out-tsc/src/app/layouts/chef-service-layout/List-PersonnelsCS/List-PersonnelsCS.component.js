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
var ListPersonnelsComponent = /** @class */ (function () {
    function ListPersonnelsComponent(http, ChefService) {
        this.http = http;
        this.ChefService = ChefService;
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
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Prenom",
                field: "prenom",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Sexe",
                field: "sexe",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 80
            },
            {
                headerName: "Téléphone",
                field: "telephone",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 92
            },
            {
                headerName: "Email",
                field: "email",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Grade",
                field: "grade.nom_grade",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Departement",
                field: "departement.nom_dept",
                sortable: true,
                filter: true,
                editable: true
            }
        ];
    }
    ListPersonnelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ChefService.listerPersonnel().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
    };
    ListPersonnelsComponent = __decorate([
        core_1.Component({
            selector: "app-list-personnels",
            templateUrl: "./List-PersonnelsCS.component.html",
            styleUrls: ["./List-PersonnelsCS.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            chef_service_service_1.ChefServiceService])
    ], ListPersonnelsComponent);
    return ListPersonnelsComponent;
}());
exports.ListPersonnelsComponent = ListPersonnelsComponent;
//# sourceMappingURL=List-PersonnelsCS.component.js.map