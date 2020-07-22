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
var ChefServiceService = /** @class */ (function () {
    function ChefServiceService(http) {
        this.http = http;
    }
    ChefServiceService.prototype.listerPersonnel = function () {
        return this.http.get("http://localhost:8082/api/listPersonnels");
    };
    ChefServiceService.prototype.listerPersonnelAyantAffT = function () {
        return this.http.get("http://localhost:8082/api/list_T_Personnel");
    };
    //---------------------------------------------------------------------------
    ChefServiceService.prototype.listerSite = function () {
        return this.http.get("http://localhost:8082/api/listSites");
    };
    ChefServiceService.prototype.getSitesParGouv = function (idGouv) {
        return this.http.get("http://localhost:8082/api/listSiteG/" + idGouv);
    };
    //------------------------------------------------------------------------------------------
    ChefServiceService.prototype.listerGouvernorats = function () {
        return this.http.get("http://localhost:8082/api/listGouvernorats");
    };
    //---------------------------------------------------------------------------
    ChefServiceService.prototype.listerAffP = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_P");
    };
    ChefServiceService.prototype.addAffP = function (AffectationPartielle) {
        return this.http.post("http://localhost:8082/api/addAffectation_P", AffectationPartielle);
    };
    //-----------------------------------------------------------------------------------------------
    ChefServiceService.prototype.listerAffTot = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_T");
    };
    ChefServiceService.prototype.addAffTot = function (AffectationTotale) {
        return this.http.post("http://localhost:8082/api/addAffectation_T", AffectationTotale);
    };
    ChefServiceService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ChefServiceService);
    return ChefServiceService;
}());
exports.ChefServiceService = ChefServiceService;
//# sourceMappingURL=chef-service.service.js.map