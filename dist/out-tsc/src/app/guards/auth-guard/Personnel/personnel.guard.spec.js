"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var personnel_guard_1 = require("./personnel.guard");
describe('PersonnelGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(personnel_guard_1.PersonnelGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=personnel.guard.spec.js.map