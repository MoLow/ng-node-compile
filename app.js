var express = require('express');
var app = express();

var ngcompile = require('./main.js');

var ngenv = new ngcompile();
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send(ngenv.$compile("<div>{{name}}</div>")({ name: 'aaa' }));
});
app.listen(3000);
