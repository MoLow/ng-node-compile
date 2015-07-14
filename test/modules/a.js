angular.module('test', [])
.directive('yellow', [function () {
    return { 
        restrict: "A",
        replace: false,
        scope: false,
        link: function (scope, element, attr) {
            if (attr['yellow'].toString() === "true") element.css('color', 'yellow')
        }
    }
}])