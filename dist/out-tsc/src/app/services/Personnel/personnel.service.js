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
var http_2 = require("@angular/common/http");
var PersonnelService = /** @class */ (function () {
    function PersonnelService(http) {
        this.http = http;
    }
    PersonnelService.prototype.getAffPparPersonnel = function () {
        return this.http.get("http://localhost:8082/api/listAffectation_P_Personnel");
    };
    PersonnelService.prototype.getMission = function (idMission) {
        return this.http.get("http://localhost:8082/api/getMission/" + idMission);
    };
    PersonnelService.prototype.getMissionsparAffect = function (idAffect) {
        return this.http.get("http://localhost:8082/api/listMissionAffectation/" + idAffect);
    };
    PersonnelService.prototype.getOrdreOfAff = function (idAffect) {
        return this.http.get("http://localhost:8082/api/getOrdreOfAff/" + idAffect);
    };
    PersonnelService.prototype.pdfAffReport = function (idO_Aff) {
        var headers = new http_2.HttpHeaders();
        return this.http.get("http://localhost:8082/api/pdfreport/" + idO_Aff, {
            responseType: "blob"
        });
    };
    PersonnelService.prototype.getOrdreOfMiss = function (idMission) {
        return this.http.get("http://localhost:8082/api/getOrdreOfMiss/" + idMission);
    };
    PersonnelService.prototype.pdfmissionReport = function (idO_Miss) {
        var headers = new http_2.HttpHeaders();
        return this.http.get("http://localhost:8082/api/missionReport/" + idO_Miss, {
            responseType: "blob"
        });
    };
    PersonnelService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PersonnelService);
    return PersonnelService;
}());
exports.PersonnelService = PersonnelService;
//# sourceMappingURL=personnel.service.js.map