var http = require('http');
var express = require('express');
var app = express();

var path = require('path');
var getRoute = require('./routes/getRoute.js');
var postRoute = require('./routes/postRoute.js');

var config = require('./config.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// add routes mapping
app.use('/', getRoute);
app.use('/', postRoute);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// run server
var server = app.listen(1337, function () {
	var host = server.address().address,
		port = server.address().port;

	console.log('NodeBox app listening at http://%s:%s', host, port);
});
module.exports = app;