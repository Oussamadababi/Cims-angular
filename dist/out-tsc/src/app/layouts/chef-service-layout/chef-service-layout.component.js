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
require("rxjs/add/operator/filter");
var router_1 = require("@angular/router");
var perfect_scrollbar_1 = require("perfect-scrollbar");
var $ = require("jquery");
var user_service_1 = require("../../services/authentification/user.service");
var ChefServiceLayoutComponent = /** @class */ (function () {
    /*private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;*/
    function ChefServiceLayoutComponent(location, router, userService // private tokenStorageService: TokenStorageService
    ) {
        this.location = location;
        this.router = router;
        this.userService = userService;
        this.yScrollStack = [];
        this.content = "";
    }
    ChefServiceLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getchefServiceBoard().subscribe(function (data) {
            _this.content = data;
        }, function (err) {
            _this.content = JSON.parse(err.error).message;
        });
        var isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;
        if (isWindows &&
            !document
                .getElementsByTagName("body")[0]
                .classList.contains("sidebar-mini")) {
            // if we are on windows OS we activate the perfectScrollbar function
            document
                .getElementsByTagName("body")[0]
                .classList.add("perfect-scrollbar-on");
        }
        else {
            document
                .getElementsByTagName("body")[0]
                .classList.remove("perfect-scrollbar-off");
        }
        var elemMainPanel = document.querySelector(".main-panel");
        var elemSidebar = (document.querySelector(".sidebar .sidebar-wrapper"));
        this.location.subscribe(function (ev) {
            _this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (event.url != _this.lastPoppedUrl)
                    _this.yScrollStack.push(window.scrollY);
            }
            else if (event instanceof router_1.NavigationEnd) {
                if (event.url == _this.lastPoppedUrl) {
                    _this.lastPoppedUrl = undefined;
                    window.scrollTo(0, _this.yScrollStack.pop());
                }
                else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var ps = new perfect_scrollbar_1.default(elemMainPanel);
            ps = new perfect_scrollbar_1.default(elemSidebar);
        }
        var window_width = $(window).width();
        var $sidebar = $(".sidebar");
        var $sidebar_responsive = $("body > .navbar-collapse");
        var $sidebar_img_container = $sidebar.find(".sidebar-background");
        if (window_width > 767) {
            if ($(".fixed-plugin .dropdown").hasClass("show-dropdown")) {
                $(".fixed-plugin .dropdown").addClass("open");
            }
        }
        $(".fixed-plugin a").click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass("switch-trigger")) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });
        $(".fixed-plugin .badge").click(function () {
            var $full_page_background = $(".full-page-background");
            $(this)
                .siblings()
                .removeClass("active");
            $(this).addClass("active");
            var new_color = $(this).data("color");
            if ($sidebar.length !== 0) {
                $sidebar.attr("data-color", new_color);
            }
            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr("data-color", new_color);
            }
        });
        $(".fixed-plugin .img-holder").click(function () {
            var $full_page_background = $(".full-page-background");
            $(this)
                .parent("li")
                .siblings()
                .removeClass("active");
            $(this)
                .parent("li")
                .addClass("active");
            var new_image = $(this)
                .find("img")
                .attr("src");
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut("fast", function () {
                    $sidebar_img_container.css("background-image", 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn("fast");
                });
            }
            if ($full_page_background.length != 0) {
                $full_page_background.fadeOut("fast", function () {
                    $full_page_background.css("background-image", 'url("' + new_image + '")');
                    $full_page_background.fadeIn("fast");
                });
            }
            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css("background-image", 'url("' + new_image + '")');
            }
        });
    };
    ChefServiceLayoutComponent.prototype.ngAfterViewInit = function () {
        this.runOnRouteChange();
    };
    ChefServiceLayoutComponent.prototype.isMaps = function (path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    };
    ChefServiceLayoutComponent.prototype.runOnRouteChange = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemMainPanel = document.querySelector(".main-panel");
            var ps = new perfect_scrollbar_1.default(elemMainPanel);
            ps.update();
        }
    };
    ChefServiceLayoutComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
            navigator.platform.toUpperCase().indexOf("IPAD") >= 0) {
            bool = true;
        }
        return bool;
    };
    ChefServiceLayoutComponent = __decorate([
        core_1.Component({
            selector: "app-chef-service-layout",
            templateUrl: "./chef-service-layout.component.html",
            styleUrls: ["./chef-service-layout.component.css"]
        }),
        __metadata("design:paramtypes", [common_1.Location,
            router_1.Router,
            user_service_1.UserService // private tokenStorageService: TokenStorageService
        ])
    ], ChefServiceLayoutComponent);
    return ChefServiceLayoutComponent;
}());
exports.ChefServiceLayoutComponent = ChefServiceLayoutComponent;
//# sourceMappingURL=chef-service-layout.component.js.map