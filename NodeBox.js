var http = require('http');
var express = require('express');
var app = express();

var path = require('path');
var getRoute = require('./routes/getRoute.js');
var postRoute = require('./routes/postRoute.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// add routes mapping
app.use('/', getRoute);
app.use('/', postRoute);

// run server
var server = app.listen(1337, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
module.exports = app;