var jsdom = require("jsdom"),
    path = require('path');

var ENVIORMENT_NOT_READY = "Angular enviorment not yet ready";

function ngCompile(modules, angularPath, settings) {

    if (typeof angularPath === "object") {
        settings = angularPath;
        angularPath = null;
    }

    if (!(modules instanceof Array)) {
        if (typeof modules === "object")
            settings = modules;
        else if (typeof modules === "string") {
            angularPath = modules;
        }
        modules = [];
    }


    this.settings = settings || {};
    this.modules = modules;
    var _self = this;
    this.modules.unshift({ name: 'ng', path: angularPath || path.resolve(__dirname, "angular.js") });

    if (!ngCompile.prototype.envReady) throw new Error(ENVIORMENT_NOT_READY);

    this._modules = [];
    this.modules.forEach(function (module) {
        require(path.resolve(process.cwd(), module.path));
        if (module.name === "ng") global.angular = global.window.angular;
        _self._modules.push(module.name);
    });


    this.window = global.window;
    this.angular = window.angular;

    if (_self.settings.startSymbol || _self.settings.endSymbol) {
        var start = _self.settings.startSymbol || '{{', end = _self.settings.endSymbol || '}}';
        angular.module('ngCompileInterpolateProviderSymbols', []).config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol(start.toString());
            $interpolateProvider.endSymbol(end.toString());
        });
        this._modules.push('ngCompileInterpolateProviderSymbols');
    }

    this.onReady = new Promise(function (resolve, reject) {
        _self.ready = false;
        window.angular.injector(_self._modules).invoke(function ($rootScope, $compile, $interpolate) {
            _self.services = { $rootScope: $rootScope, $compile: $compile, $interpolate: $interpolate };
            _self.ready = true;
            resolve();
        });
    });
}
ngCompile.prototype.env = new Promise(function (resolve, reject) {
    ngCompile.prototype.envReady = false;
    jsdom.env({
        html: '<p></p>',
        done: function (errors, window) {
            /* istanbul ignore if */
            if (errors)
                reject(errors)
            else {
                global.window = window;
                global.document = window.document;
                ngCompile.prototype.envReady = true;
                resolve();
            }
        }
    })
});
ngCompile.prototype.$new = function () {
    if (!this.ready) throw new Error(ENVIORMENT_NOT_READY);
    return this.services.$rootScope.$new()
}
ngCompile.prototype.$interpolate = function (html) {
    if (!this.ready) throw new Error(ENVIORMENT_NOT_READY);
    return this.services.$interpolate(html)
}
ngCompile.prototype.$compile = function (html) {
    if (!this.ready) throw new Error(ENVIORMENT_NOT_READY);
    if (typeof html === "object") html = (html.length ? html[0].outerHTML : html.outerHTML);
    var $scope = this.$new(), _self = this;
    return function (context) {
        _self.angular.extend($scope, context);
        var elem = _self.services.$compile(html)($scope);
        elem = _self.angular.element('<div/>').append(elem);
        $scope.$apply();
        var str = elem[0].innerHTML;
        $scope.$destroy();
        elem = $scope = null;
        return str;
    }
}


module.exports = ngCompile;