"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rhservice_service_1 = require("./rhservice.service");
describe("RHService", function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(rhservice_service_1.RHService);
    });
    it("should be created", function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=rhservice.service.spec.js.map