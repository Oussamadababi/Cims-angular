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
var common_1 = require("@angular/common");
var user_service_1 = require("../services/authentification/user.service");
var authentification_service_1 = require("../services/authentification/authentification.service");
var ProfilComponent = /** @class */ (function () {
    function ProfilComponent(location, AuthentificationService, UserService) {
        this.location = location;
        this.AuthentificationService = AuthentificationService;
        this.UserService = UserService;
        this.form = {};
        this.passwordDuplique = false;
        this.errorMessage = "";
    }
    ProfilComponent.prototype.gotoHome = function () {
        this.location.back();
    };
    ProfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.UserService.showProfile().subscribe(function (res) {
            console.log(res["personnel"]);
            _this.nom = res["personnel"].nom;
            _this.prenom = res["personnel"].prenom;
            _this.grade = res["personnel"].grade.nom_grade;
            _this.dep = res["personnel"].departement.nom_dept;
            _this.email = res["personnel"].email;
            _this.mobile = res["personnel"].telephone;
            _this.sexe = res["personnel"].sexe;
        });
    };
    ProfilComponent.prototype.onSubmit = function () {
        var _this = this;
        var error;
        console.log(this.form.password);
        console.log(this.pass2);
        if (this.form.password == this.pass2) {
            this.passwordDuplique == false;
            this.AuthentificationService.updatePassword(this.form).subscribe(function (data) {
                console.log(data);
            }, function (err) {
                _this.errorMessage = err.error.message;
            });
        }
        else {
            console.log("true");
            this.passwordDuplique == true;
        }
    };
    ProfilComponent = __decorate([
        core_1.Component({
            selector: "app-profil",
            templateUrl: "./profil.component.html",
            styleUrls: ["./profil.component.css"]
        }),
        __metadata("design:paramtypes", [common_1.Location,
            authentification_service_1.AuthentificationService,
            user_service_1.UserService])
    ], ProfilComponent);
    return ProfilComponent;
}());
exports.ProfilComponent = ProfilComponent;
//# sourceMappingURL=profil.component.js.map