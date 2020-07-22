"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var chef_service_guard_1 = require("./chef-service.guard");
describe('ChefServiceGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(chef_service_guard_1.ChefServiceGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=chef-service.guard.spec.js.map