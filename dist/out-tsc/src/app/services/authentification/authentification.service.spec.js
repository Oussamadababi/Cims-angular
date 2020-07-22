"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var authentification_service_1 = require("./authentification.service");
describe("AuthentificationService", function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(authentification_service_1.AuthentificationService);
    });
    it("should be created", function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=authentification.service.spec.js.map