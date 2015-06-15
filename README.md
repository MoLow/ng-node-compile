# ng-node-compile

Compile html templates the angular way, in node js!
this is a pretty new package, so don't hesitate adding issues or pull requests!

## Install

```bash
$ npm install ng-node-compile
```

## How to Use?
The library exposes several angular services, which will let you compile angular templates inside node:

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
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Moshe 1</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Moshe 2</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Moshe 3</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Moshe 4</div>
<div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Moshe 5</div>
```
