var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/app"));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.listen(process.env.PORT || 5000);
