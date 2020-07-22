"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rh_guard_1 = require("./rh.guard");
describe('RhGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(rh_guard_1.RhGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=rh.guard.spec.js.map