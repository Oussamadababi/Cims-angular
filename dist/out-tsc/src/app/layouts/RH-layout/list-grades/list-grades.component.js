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
var ListGradesComponent = /** @class */ (function () {
    function ListGradesComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.grade = { id_grade: "", nom_grade: "" };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nom_grade",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 1000
            }
        ];
    }
    ListGradesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addgrade = false;
        this.Rhservice.listerGrades().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
    };
    ListGradesComponent.prototype.add = function () {
        var _this = this;
        this.Rhservice.addGrade(this.grade).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.log(this.grade);
    };
    ListGradesComponent.prototype.getId = function (event) {
        this.id = event.data["id_grade"];
        console.log(event.data["id_grade"]);
        console.log(this.id);
    };
    ListGradesComponent.prototype.edit = function (event) {
        this.Rhservice.updateGrade(event.data["id_grade"], event.data).subscribe(function (res) {
            console.log("Grade modifié");
        });
    };
    ListGradesComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deleteGrade(this.id).subscribe(function (res) {
            console.log("Grade Supprimé");
            _this.ngOnInit();
        });
    };
    ListGradesComponent.prototype.displayaddgrade = function () {
        this.addgrade = true;
    };
    ListGradesComponent.prototype.cancel = function () {
        this.addgrade = false;
    };
    ListGradesComponent = __decorate([
        core_1.Component({
            selector: "app-list-grades",
            templateUrl: "./list-grades.component.html",
            styleUrls: ["./list-grades.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListGradesComponent);
    return ListGradesComponent;
}());
exports.ListGradesComponent = ListGradesComponent;
//# sourceMappingURL=list-grades.component.js.map