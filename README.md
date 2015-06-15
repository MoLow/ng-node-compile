# ng-node-compile

Compile html templates the angular way, in node js!
this is a pretty new package, so don't hesitate adding issues or pull requests!

```js
new ngcompile().$interpolate("hello {{name}}")({ name: 'Jhon doe' });
```

## Install

```bash
$ npm install ng-node-compile
```

## How to Use?
The library exposes several angular services, which will let you compile angular templates inside node:

###ngcompile

this is the function to create a angular enviorment. just
```js
var ngEnviorment = new ngcompile([modules],[angularPath]);
```

arguments:

* modules: optional. array of modules to inject to angular enviorment.
  example: [{name: 'testModule', path: './test.js'}]

* angularPath: optional. path to angular.js file, in case you want another angular version.


###$interpolate:

```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile();
ngEnviorment.$interpolate("hello {{name}}")({ name: 'Jhon doe' });
```

this wil return a string "hello Jhon doe"

###$compile:

```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile();
ngEnviorment.$compile("<div ng-repeat=\"n in [1,2,3,4,5]\">hello {{name}} {{n}}</div>")({ name: 'Jhon doe' });
```

this wil return the following HTML:

```html
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 1</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 2</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 3</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 4</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 5</div>
```

##example using express and extra angular moduls:

####app.js:

```js
var express = require('express'),
    ngcompile = require('ng-node-compile');

var ngEnviorment = new ngcompile([{ name: 'test', path: './test.js' }]);
var app = express();

app.get('/', function (req, res) {
    res.send(ngEnviorment.$compile("<div ng-repeat=\"n in [1,2,3,4,5]\" yellow=\"{{n==3}}\">hello {{name}} {{n}}</div>")({ name: 'Jhon doe' }));
});

var server = app.listen(3000);
```
####test.js:

```js
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
```