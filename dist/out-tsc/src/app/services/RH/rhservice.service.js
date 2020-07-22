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
var RHService = /** @class */ (function () {
    function RHService(http) {
        this.http = http;
    }
    RHService.prototype.listerSite = function () {
        return this.http.get("http://localhost:8082/api/listSites");
    };
    RHService.prototype.updateSite = function (idSite, site) {
        return this.http.put("http://localhost:8082/api/updateSite/" + idSite, site);
    };
    RHService.prototype.addSite = function (site) {
        return this.http.post("http://localhost:8082/api/addSite", site);
    };
    RHService.prototype.deleteSite = function (idSite) {
        return this.http.delete("http://localhost:8082/api/deleteSite/" + idSite);
    };
    RHService.prototype.getSitesParGouv = function (idGouv) {
        return this.http.get("http://localhost:8082/api/listSiteG/" + idGouv);
    };
    //--------------------------------------------------------------------------------------------------------------
    RHService.prototype.listerGrades = function () {
        return this.http.get("http://localhost:8082/api/listGrades");
    };
    RHService.prototype.updateGrade = function (id_grade, grade) {
        return this.http.put("http://localhost:8082/api/updateGrade/" + id_grade, grade);
    };
    RHService.prototype.addGrade = function (grade) {
        return this.http.post("http://localhost:8082/api/addGrade", grade);
    };
    RHService.prototype.deleteGrade = function (id_grade) {
        return this.http.delete("http://localhost:8082/api/deleteGrade/" + id_grade);
    };
    //----------------------------------------------------------------------------------------------------------------
    /*listerFonctions() {
      return this.http.get("http://localhost:8082/api/listFonctions");
    }
    updateFonction(id_fonction: number, fonction: object) {
      return this.http.put(
        "http://localhost:8082/api/updateFonction/" + id_fonction,
        fonction
      );
    }
    addFonction(fonction: object) {
      return this.http.post("http://localhost:8082/api/addFonction", fonction);
    }
    deleteFonction(id_fonction: number) {
      return this.http.delete(
        "http://localhost:8082/api/deleteFonction/" + id_fonction
      );
    }*/
    //---------------------------------------------------------------------------------------
    RHService.prototype.listerPersonnel = function () {
        return this.http.get("http://localhost:8082/api/listPersonnels");
    };
    RHService.prototype.updatePersonnel = function (id_personnel, personnel) {
        return this.http.put("http://localhost:8082/api/updatePersonnel/" + id_personnel, personnel);
    };
    RHService.prototype.addPersonnel = function (personnel) {
        return this.http.post("http://localhost:8082/api/addPersonnel", personnel);
    };
    RHService.prototype.deletePersonnel = function (id_personnel) {
        return this.http.delete("http://localhost:8082/api/deletePersonnel/" + id_personnel);
    };
    //---------------------------------------------------------------------------
    RHService.prototype.listerDepartements = function () {
        return this.http.get("http://localhost:8082/api/listDepartements");
    };
    RHService.prototype.updateDepartement = function (id_dept, departement) {
        return this.http.put("http://localhost:8082/api/updateDepartement/" + id_dept, departement);
    };
    RHService.prototype.addDepartement = function (departement) {
        return this.http.post("http://localhost:8082/api/addDepartement", departement);
    };
    RHService.prototype.deleteDepartement = function (id_dept) {
        return this.http.delete("http://localhost:8082/api/deleteDepartement/" + id_dept);
    };
    //------------------------------------------------------------------------------------------
    RHService.prototype.listerGouvernorats = function () {
        return this.http.get("http://localhost:8082/api/listGouvernorats");
    };
    //-------------------------------------------------------------------------------------------
    RHService.prototype.listerAffP = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_P_Valider");
    };
    //-----------------------------------------------------------------------------------------------
    RHService.prototype.listerAffTot = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_T");
    };
    RHService.prototype.addAffTot = function (AffectationTotale) {
        return this.http.post("http://localhost:8082/api/addAffectation_T", AffectationTotale);
    };
    RHService.prototype.updateAffTot = function (idAffectT, AffectationTotale) {
        return this.http.put("http://localhost:8082/api/updateAffectation_T/" + idAffectT, AffectationTotale);
    };
    RHService.prototype.deleteAffTot = function (idAffectT) {
        return this.http.delete("http://localhost:8082/api/deleteAffectation_T/" + idAffectT);
    };
    //------------------------------------------------------------------------------------------------
    RHService.prototype.DashAffpardate = function () {
        return this.http.get("http://localhost:8082/api/listerAffpardate");
    };
    RHService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RHService);
    return RHService;
}());
exports.RHService = RHService;
//# sourceMappingURL=rhservice.service.js.map