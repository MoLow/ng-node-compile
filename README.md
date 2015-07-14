# ng-node-compile [![Build Status](https://travis-ci.org/MoLow/ng-node-compile.svg?branch=v2.x)](https://travis-ci.org/MoLow/ng-node-compile) [![Coverage Status](https://coveralls.io/repos/MoLow/ng-node-compile/badge.svg?branch=v2.x&service=github)](https://coveralls.io/github/MoLow/ng-node-compile?branch=v2.x)

Compile html templates the angular way, in node js!
this is a pretty new package, so don't hesitate adding issues or pull requests!

Note that as of our 2.0.0 release, nc-node-compile no longer works with Node.js™, and instead requires io.js. You are still welcome to install a release in the [1.x](https://github.com/MoLow/ng-node-compile/tree/v1.x) series if you use Node.js™.

```js
new ngcompile().$interpolate("hello {{name}}")({ name: 'Jhon doe' });
```

## Install

```bash
$ npm install ng-node-compile
```

## How to Use?
The library exposes several angular services, which will let you compile angular templates inside node:

**ngcompile**

this is the function to create a angular enviorment. just
```js
var ngEnviorment = new ngcompile([modules],[angularPath],[settings]);
```

arguments:

* modules: optional. array of modules to inject to angular enviorment.
  example: [{name: 'testModule', path: './test.js'}]

* angularPath: optional. path to angular.js file, in case you want another angular version.

* settings: optional. could be used for changing angular's {{ startSymbol and }} endSymbo

**$interpolate:**

```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile();
ngEnviorment.$interpolate("hello {{name}}")({ name: 'Jhon doe' });
```

this wil return a string "hello Jhon doe"

**$compile:**

```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile();
ngEnviorment.$compile("<div ng-repeat=\"n in [1,2,3,4,5]\">hello {{name}} {{n}}</div>")({ name: 'Jhon doe' });
```


**using settings**
```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile({ startSymbol: '[[', endSymbol: ']]' });
ngEnviorment.$compile("<div class=\"[[name]]\">hello {{name}}</div>")({ name: 'active' });
```
can also be called with angular modules and angular path arguments:
```js
var ngEnviorment = new ngcompile([{ name: 'test', path: './test.js' }], './angular.js', { startSymbol: '[[', endSymbol: ']]' });
```

**async issues**
usualy ng-node-compile should work perfectly in synchronic calls. if You get a "Angular enviorment not yet ready" error,
you could use the onReady function:
```js
var ngcompile = require('ng-node-compile');
var ngEnviorment = new ngcompile();
ngEnviorment.onReady(function(){
    ngEnviorment.$interpolate("hello {{name}}")({ name: 'Jhon doe' });
});
```


##example using express and extra angular moduls:

**app.js:**

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
**test.js:**

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

and the restlt simply looks this way:

![result](https://raw.githubusercontent.com/MoLow/ng-node-compile/master/capture.PNG)

```html
<div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 1</div>
<div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 2</div>
<div ng-repeat="n in [1,2,3,4,5]" yellow="true" class="ng-binding ng-scope" style="color: yellow;">hello Jhon doe 3</div>
<div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 4</div>
<div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 5</div>
```