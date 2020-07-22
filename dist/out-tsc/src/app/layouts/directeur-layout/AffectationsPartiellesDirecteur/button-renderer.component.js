"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ButtonRendererComponent = /** @class */ (function () {
    function ButtonRendererComponent() {
    }
    ButtonRendererComponent.prototype.agInit = function (params) {
        this.params = params;
        this.label = this.params.label || null;
    };
    ButtonRendererComponent.prototype.refresh = function (params) {
        return true;
    };
    ButtonRendererComponent.prototype.onClick = function ($event) {
        if (this.params.onClick instanceof Function) {
            // put anything into params u want pass into parents component
            var params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            };
            this.params.onClick(params);
        }
    };
    ButtonRendererComponent = __decorate([
        core_1.Component({
            selector: "app-button-renderer",
            template: "\n    <button type=\"button\" (click)=\"onClick($event)\">{{ label }}</button>\n  "
        })
    ], ButtonRendererComponent);
    return ButtonRendererComponent;
}());
exports.ButtonRendererComponent = ButtonRendererComponent;
//# sourceMappingURL=button-renderer.component.js.map