var express = require('express');
var app = express();
var morgan = require('morgan');
app.use('/', express.static('src'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('combined'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Excell app listening at http://%s:%s', host, port);
});