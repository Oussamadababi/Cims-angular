"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var directeur_guard_1 = require("./directeur.guard");
describe('DirecteurGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(directeur_guard_1.DirecteurGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=directeur.guard.spec.js.map