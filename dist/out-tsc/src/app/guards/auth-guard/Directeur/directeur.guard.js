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
var router_1 = require("@angular/router");
var token_storage_service_1 = require("../../../services/authentification/token-storage.service");
var DirecteurGuard = /** @class */ (function () {
    function DirecteurGuard(router, tokenStorage) {
        this.router = router;
        this.tokenStorage = tokenStorage;
    }
    DirecteurGuard.prototype.canActivate = function (next, state) {
        var token = sessionStorage.getItem("auth-token");
        if (token == null &&
            this.tokenStorage.getUser().roles == "ROLE_DIRECTEUR") {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    };
    DirecteurGuard = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [router_1.Router,
            token_storage_service_1.TokenStorageService])
    ], DirecteurGuard);
    return DirecteurGuard;
}());
exports.DirecteurGuard = DirecteurGuard;
//# sourceMappingURL=directeur.guard.js.map