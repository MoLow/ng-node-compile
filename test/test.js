var should = require('chai').should(),
    ngcompile = require('../main.js');



describe('$interpolate', function () {
    it('Should interpolate a string with angulare service', function () {
        var ngEnviorment = new ngcompile();
        ngEnviorment.$interpolate("hello {{name}}!")({ name: 'Jhon doe' }).should.equal('hello Jhon doe!');
    });

});

describe('arguments', function () {
    it('Should support all combinations of arguments', function () {
        var ngEnviorment = new ngcompile().should.be.ok;
        var ngEnviorment = new ngcompile([{ name: 'test', path: './test/modules/a.js' }]).should.be.ok;
        var ngEnviorment = new ngcompile([{ name: 'test', path: './test/modules/a.js' }], "./angular.js", { startSymbol: '[[', endSymbol: ']]' }).should.be.ok;
        var ngEnviorment = new ngcompile([{ name: 'test', path: './test/modules/a.js' }], { startSymbol: '[[', endSymbol: ']]' }).should.be.ok;
        var ngEnviorment = new ngcompile({ startSymbol: '[[', endSymbol: ']]' }).should.be.ok;
        var ngEnviorment = new ngcompile("./angular.js", { startSymbol: '[[', endSymbol: ']]' }).should.be.ok;
    });
});
describe('$compile', function () {
    it('Should simple compile', function () {
        var ngEnviorment = new ngcompile();
        ngEnviorment.$compile("<div ng-repeat=\"n in [1,2,3,4,5]\">hello {{name}} {{n}}</div>")({ name: 'Jhon doe' })
            .should.equal('<!-- ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 1</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 2</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 3</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 4</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" class="ng-binding ng-scope">hello Jhon doe 5</div><!-- end ngRepeat: n in [1,2,3,4,5] -->');
    });

    it('Should compile with [[ instead of {{', function () {
        var ngEnviorment = new ngcompile({ startSymbol: '[[', endSymbol: ']]' });
        ngEnviorment.$compile("<div class=\"[[name]]\">hello {{name}}</div>")({ name: 'active' })
                .should.equal('<div class="active">hello {{name}}</div>');
    });

    it('Should compile with extra module', function () {
        var ngEnviorment = new ngcompile([{ name: 'test', path: './test/modules/a.js' }]);
        ngEnviorment.$compile("<div ng-repeat=\"n in [1,2,3,4,5]\" yellow=\"{{n==3}}\">hello {{name}} {{n}}</div>")({ name: 'Jhon doe' })
             .should.equal('<!-- ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 1</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 2</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" yellow="true" class="ng-binding ng-scope" style="color: yellow;">hello Jhon doe 3</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 4</div><!-- end ngRepeat: n in [1,2,3,4,5] --><div ng-repeat="n in [1,2,3,4,5]" yellow="false" class="ng-binding ng-scope">hello Jhon doe 5</div><!-- end ngRepeat: n in [1,2,3,4,5] -->');
    });
});