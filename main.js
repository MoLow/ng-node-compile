var jsdom = require("jsdom-nogyp"),
    fs = require("fs");


function ngCompile(modules, angularPath) {
    this.modules = modules || [], _self = this;
    this.modules.push(angularPath || "./public/angular.js");

    this.env = jsdom.env({
        html: '<p></p>',
        done: function (errors, window) {
            if (errors)
                console.log(errors);
            else {
                global.window = window;
                global.document = window.document;
                require("./public/angular.js");

                _self.window = window;
                _self.angular = window.angular;
                window.angular.injector(['ng']).invoke(function ($rootScope, $compile, $interpolate) {
                    _self.services = { $rootScope: $rootScope, $compile: $compile, $interpolate: $interpolate };

                    console.log('ready')
                });
            }
        }
    });
}
ngCompile.prototype.$new = function () {
    return this.services.$rootScope.$new()
}
ngCompile.prototype.$interpolate = function (html) {
    return this.services.$interpolate(html)
}
ngCompile.prototype.$compile = function (html) {
    if (typeof html === "object") html = (html.length ? html[0].outerHTML : html.outerHTML);
    var $scope = this.$new(), _self = this;
    return function (context) {
        _self.angular.extend($scope, context);
        var elem = _self.services.$compile(html)($scope);
        $scope.$apply();
        var str = elem[0].outerHTML;
        $scope.$destroy();
        elem = $scope = null;
        return str;
    }
}


module.exports = ngCompile;