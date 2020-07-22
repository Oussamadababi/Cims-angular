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
var personnel_service_1 = require("../../../services/Personnel/personnel.service");
var dialog_1 = require("@angular/material/dialog");
var Mes_AffectationsComponent = /** @class */ (function () {
    function Mes_AffectationsComponent(HttpClient, PersonnelService, dialog) {
        this.HttpClient = HttpClient;
        this.PersonnelService = PersonnelService;
        this.dialog = dialog;
        this.OrdreAffectationP = {
            idO_Aff: ""
        };
        this.OrdreMission = {
            idO_Miss: ""
            //transport: Boolean
        };
        this.Mission = [
            {
                idMission: "",
                heureDepart: "",
                heureArrivee: "",
                date: "",
                AffectationPartielle: { idAffect: "" },
                OrdreMission: {
                    idO_Miss: ""
                },
                checked: false
            }
        ];
        this.AffectationPartielle = [
            {
                idAffect: "",
                dateDebut: "",
                datefin: "",
                site: { idSite: "" },
                personnel: { id_personnel: "" },
                jour: "",
                sujet: "Assistance technique",
                OrdreAffectationP: {
                    idO_Aff: ""
                },
                opened: false,
                checked: false
            }
        ];
    }
    Mes_AffectationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.PersonnelService.getAffPparPersonnel().subscribe(function (data) {
            _this.AffectationPartielle = data;
            console.dir(data);
        }, function (err) {
            console.log(err);
        });
    };
    Mes_AffectationsComponent.prototype.openDialog = function () {
        this.dialog.open(DialogElementsExampleDialog);
    };
    //automatiquement checké affectation quand tt ses missions sont chechées
    Mes_AffectationsComponent.prototype.onChange = function (id) {
        var idAff;
        this.PersonnelService.getMission(id).subscribe(function (data) {
            console.log(data["affectationPartielle"].idAffect);
            idAff = data["affectationPartielle"].idAffect;
        });
        var numberOfChildCheckBoxes = $(".cb").length;
        console.log(numberOfChildCheckBoxes);
        $(".cb").change(function () {
            var checkedChildCheckBox = $(".cb:checked").length;
            console.log(checkedChildCheckBox);
            if (checkedChildCheckBox == numberOfChildCheckBoxes) {
                $("#" + idAff + "checkAll").prop("checked", true);
            }
            else
                $("#" + idAff + "checkAll").prop("checked", false);
        });
    };
    Mes_AffectationsComponent.prototype.getMissionParId = function (id) {
        var _this = this;
        console.log(this.AffectationPartielle);
        this.AffectationPartielle.forEach(function (element) {
            if (element.idAffect == id) {
                element.opened = !element.opened;
            }
            else {
                element.opened = false;
            }
        });
        this.PersonnelService.getMissionsparAffect(id).subscribe(function (data) {
            console.log(data);
            _this.Mission = data;
        });
    };
    Mes_AffectationsComponent.prototype.getOrdreOfAff = function (id) {
        var _this = this;
        this.PersonnelService.getOrdreOfAff(id).subscribe(function (data) {
            _this.OrdreAffectationP = data;
            console.log(_this.OrdreAffectationP);
        });
        this.pdfAffReport(this.OrdreAffectationP["idO_Aff"]);
    };
    Mes_AffectationsComponent.prototype.pdfAffReport = function (idOAff) {
        this.PersonnelService.pdfAffReport(idOAff).subscribe(function (res) {
            var file = new Blob([res], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log("PDF AffectationP");
        });
    };
    Mes_AffectationsComponent.prototype.getOrdreOfMission = function (id) {
        var _this = this;
        this.PersonnelService.getOrdreOfMiss(id).subscribe(function (data) {
            _this.OrdreMission = data;
            console.log(_this.OrdreMission);
        });
        this.pdfmissionReport(this.OrdreMission["idO_Miss"]);
    };
    Mes_AffectationsComponent.prototype.pdfmissionReport = function (idOM) {
        this.PersonnelService.pdfmissionReport(idOM).subscribe(function (res) {
            var file = new Blob([res], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log("PDF Mission");
        });
    };
    Mes_AffectationsComponent = __decorate([
        core_1.Component({
            selector: "app-Mes_Affectations",
            templateUrl: "./Mes_Affectations.component.html",
            styleUrls: ["./Mes_Affectations.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            personnel_service_1.PersonnelService,
            dialog_1.MatDialog])
    ], Mes_AffectationsComponent);
    return Mes_AffectationsComponent;
}());
exports.Mes_AffectationsComponent = Mes_AffectationsComponent;
var upload_file_service_1 = require("../../../services/uploadFile/upload-file.service");
var DialogElementsExampleDialog = /** @class */ (function () {
    function DialogElementsExampleDialog(uploadService) {
        this.uploadService = uploadService;
        this.progress = 0;
        this.message = "";
        this.Mission = [
            {
                idMission: "",
                heureDepart: "",
                heureArrivee: "",
                date: "",
                AffectationPartielle: { idAffect: "" },
                OrdreMission: {
                    idO_Miss: ""
                },
                checked: false
            }
        ];
    }
    DialogElementsExampleDialog.prototype.selectFile = function (event) {
        this.selectedFiles = event.target.files;
    };
    DialogElementsExampleDialog.prototype.ngOnInit = function () {
        this.fileInfos = this.uploadService.getFiles();
    };
    DialogElementsExampleDialog.prototype.upload = function () {
        var _this = this;
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        this.uploadService
            .upload(this.Mission.idMission, this.currentFile)
            .subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.progress = Math.round((100 * event.loaded) / event.total);
            }
            else if (event instanceof http_1.HttpResponse) {
                _this.message = event.body.message;
                _this.fileInfos = _this.uploadService.getFiles();
            }
        }, function (err) {
            _this.progress = 0;
            _this.message = "Could not upload the file!";
            _this.currentFile = undefined;
        });
        this.selectedFiles = undefined;
    };
    DialogElementsExampleDialog = __decorate([
        core_1.Component({
            selector: "dialog-elements-example-dialog",
            templateUrl: "dialog-elements-example-dialog.html"
        }),
        __metadata("design:paramtypes", [upload_file_service_1.UploadFileService])
    ], DialogElementsExampleDialog);
    return DialogElementsExampleDialog;
}());
exports.DialogElementsExampleDialog = DialogElementsExampleDialog;
//# sourceMappingURL=Mes_Affectations.component.js.map