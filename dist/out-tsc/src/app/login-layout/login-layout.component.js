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
var authentification_service_1 = require("../services/authentification/authentification.service");
var token_storage_service_1 = require("../services/authentification/token-storage.service");
var router_1 = require("@angular/router");
var LoginLayoutComponent = /** @class */ (function () {
    function LoginLayoutComponent(authService, tokenStorage, router) {
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.router = router;
        this.form = {};
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.errorMessage = "";
        this.roles = [];
    }
    LoginLayoutComponent.prototype.ngOnInit = function () {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    };
    LoginLayoutComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authService.login(this.form).subscribe(function (data) {
            _this.tokenStorage.saveToken(data.accessToken);
            _this.tokenStorage.saveUser(data);
            _this.isLoginFailed = false;
            _this.isLoggedIn = true;
            _this.roles = _this.tokenStorage.getUser().roles;
            //this.reloadPage();
            console.log(_this.roles);
            if (_this.roles[0] == "ROLE_RH") {
                _this.router.navigate(["/RH"]);
            }
            else if (_this.roles[0] == "ROLE_DIRECTEUR") {
                _this.router.navigate(["/Directeur"]);
            }
            else if (_this.roles[0] == "ROLE_CHEFSERVCE") {
                _this.router.navigate(["/ChefService"]);
            }
            else if (_this.roles[0] == "ROLE_CORRESPONDANT" ||
                _this.roles[1] == "ROLE_CORRESPONDANT") {
                _this.router.navigate(["/CORRESPONDANT"]);
            }
        }, function (err) {
            _this.errorMessage = err.error.message;
            _this.isLoginFailed = true;
            console.log(_this.roles);
        });
    };
    LoginLayoutComponent.prototype.reloadPage = function () {
        window.location.reload();
    };
    LoginLayoutComponent = __decorate([
        core_1.Component({
            selector: "app-login-layout",
            templateUrl: "./login-layout.component.html",
            styleUrls: ["./login-layout.component.css"]
        }),
        __metadata("design:paramtypes", [authentification_service_1.AuthentificationService,
            token_storage_service_1.TokenStorageService,
            router_1.Router])
    ], LoginLayoutComponent);
    return LoginLayoutComponent;
}());
exports.LoginLayoutComponent = LoginLayoutComponent;
//# sourceMappingURL=login-layout.component.js.map