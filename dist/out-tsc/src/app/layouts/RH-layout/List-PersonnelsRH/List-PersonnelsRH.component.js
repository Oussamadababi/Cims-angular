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
var ListPersonnelsComponent = /** @class */ (function () {
    function ListPersonnelsComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
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
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Departement",
                field: "departement.nom_dept",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Date de recrutement",
                field: "date_recrutement",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 160
            }
        ];
    }
    ListPersonnelsComponent_1 = ListPersonnelsComponent;
    ListPersonnelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addpers = false;
        this.Rhservice.listerPersonnel().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
        this.Rhservice.listerGrades().subscribe(function (data) {
            _this.grade = data;
            console.dir(data);
        }, function (err) {
            console.log(err);
        });
        this.Rhservice.listerDepartements().subscribe(function (data) {
            _this.departement = data;
            console.dir(data);
        });
    };
    ListPersonnelsComponent.prototype.add = function () {
        var _this = this;
        this.Rhservice.addPersonnel(this.personnel).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.dir(this.personnel);
    };
    ListPersonnelsComponent.prototype.getId = function (event) {
        this.id = event.data["id_personnel"];
        console.log(event.data["id_personnel"]);
        console.log(this.id);
    };
    ListPersonnelsComponent.prototype.edit = function (event) {
        this.Rhservice.updatePersonnel(event.data["id_personnel"], event.data).subscribe(function (res) {
            console.log("Personnel modifié");
        });
        //console.log(event.data["idSite"]);
    };
    ListPersonnelsComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deletePersonnel(this.id).subscribe(function (res) {
            console.log("Personnel Supprimé");
            _this.ngOnInit();
        });
    };
    ListPersonnelsComponent.prototype.displayaddpers = function () {
        this.addpers = true;
    };
    ListPersonnelsComponent.prototype.cancel = function () {
        this.addpers = false;
    };
    var ListPersonnelsComponent_1;
    ListPersonnelsComponent = ListPersonnelsComponent_1 = __decorate([
        core_1.Component({
            selector: "app-list-personnels",
            templateUrl: "./List-PersonnelsRH.component.html",
            styleUrls: ["./List-PersonnelsRH.component.css"],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: core_1.forwardRef(function () { return ListPersonnelsComponent_1; })
                }
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListPersonnelsComponent);
    return ListPersonnelsComponent;
}());
exports.ListPersonnelsComponent = ListPersonnelsComponent;
//# sourceMappingURL=List-PersonnelsRH.component.js.map