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
var AUTH_API = "http://localhost:8082/api/auth/";
var httpOptions = {
    headers: new http_1.HttpHeaders({ "Content-Type": "application/json" })
};
var AuthentificationService = /** @class */ (function () {
    function AuthentificationService(http) {
        this.http = http;
    }
    AuthentificationService.prototype.login = function (credentials) {
        return this.http.post(AUTH_API + "signin", {
            username: credentials.username,
            password: credentials.password
        }, httpOptions);
    };
    AuthentificationService.prototype.updatePassword = function (user) {
        return this.http.put(AUTH_API + "updatePassword", {
            password: user.password
        }, httpOptions);
    };
    AuthentificationService.prototype.register = function (user) {
        return this.http.post(AUTH_API + "signup", {
            username: user.username,
            password: user.password
        }, httpOptions);
    };
    AuthentificationService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthentificationService);
    return AuthentificationService;
}());
exports.AuthentificationService = AuthentificationService;
//# sourceMappingURL=authentification.service.js.map