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
var DirecteurService = /** @class */ (function () {
    function DirecteurService(http) {
        this.http = http;
    }
    DirecteurService.prototype.listerPersonnel = function () {
        return this.http.get("http://localhost:8082/api/listPersonnels");
    };
    DirecteurService.prototype.listerPersonnelAyantAffT = function () {
        return this.http.get("http://localhost:8082/api/list_T_Personnel");
    };
    //---------------------------------------------------------------------------
    DirecteurService.prototype.listerSite = function () {
        return this.http.get("http://localhost:8082/api/listSites");
    };
    DirecteurService.prototype.getSitesParGouv = function (idGouv) {
        return this.http.get("http://localhost:8082/api/listSiteG/" + idGouv);
    };
    //------------------------------------------------------------------------------------------
    DirecteurService.prototype.listerGouvernorats = function () {
        return this.http.get("http://localhost:8082/api/listGouvernorats");
    };
    //---------------------------------------------------------------------------
    DirecteurService.prototype.listerAffP = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_P");
    };
    DirecteurService.prototype.addAffP = function (AffectationPartielle) {
        return this.http.post("http://localhost:8082/api/addAffectation_P", AffectationPartielle);
    };
    DirecteurService.prototype.updateAffectationP = function (idAffect, AffectationPartielle) {
        return this.http.put("http://localhost:8082/api/updateAffectation_P/" + idAffect, AffectationPartielle);
    };
    DirecteurService.prototype.deleteAffectationP = function (idAffect) {
        return this.http.delete("http://localhost:8082/api/deleteAffectation_P/" + idAffect);
    };
    //-----------------------------------------------------------------------------------------------
    DirecteurService.prototype.listerAffTot = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_T");
    };
    DirecteurService.prototype.addAffTot = function (AffectationTotale) {
        return this.http.post("http://localhost:8082/api/addAffectation_T", AffectationTotale);
    };
    DirecteurService.prototype.updateAffectationT = function (idAffectT, AffectationTotale) {
        return this.http.put("http://localhost:8082/api/updateAffectation_T/" + idAffectT, AffectationTotale);
    };
    DirecteurService.prototype.deleteAffectationT = function (idAffectT) {
        return this.http.delete("http://localhost:8082/api/deleteAffectation_T/" + idAffectT);
    };
    //Ordre affectation ---------------------------------------------------------------------------
    DirecteurService.prototype.getOrdreOfAff = function (idAffect) {
        return this.http.get("http://localhost:8082/api/getOrdreOfAff/" + idAffect);
    };
    DirecteurService.prototype.pdfAffReport = function (idO_Aff) {
        var headers = new http_1.HttpHeaders();
        return this.http.get("http://localhost:8082/api/pdfreport/" + idO_Aff, {
            responseType: "blob"
        });
    };
    DirecteurService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DirecteurService);
    return DirecteurService;
}());
exports.DirecteurService = DirecteurService;
//# sourceMappingURL=directeur.service.js.map