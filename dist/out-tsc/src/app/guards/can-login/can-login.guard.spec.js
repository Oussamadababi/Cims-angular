"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var can_login_guard_1 = require("./can-login.guard");
describe('CanLoginGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(can_login_guard_1.CanLoginGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=can-login.guard.spec.js.map