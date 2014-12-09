var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var config = require('./config.js');

var writeFile = function (res, filename, callback) {
	fs.readFile(filename, function (err, data) {
		res.write(data);
		callback();
	});
};

var writeHeader = function (res, callback) {
	writeFile(res, './resources/listHeader.html', callback);
};

var writeFooter = function (res, callback) {
	writeFile(res, './resources/listFooter.html', callback);
};

var isDirectory = function (locationPath, name) {
	return fs.statSync(locationPath + name).isDirectory();
};

var listDirectory = function (reqPath, dirName) {
	return '<li><a href = "' + reqPath + dirName + '">' +
		dirName.split('/').slice(-1) +
		'</a></li>';
};

var listFile = function (reqPath, fileName) {
	return '<li><a href = "#">' + fileName.split('/').slice(-1) + '</a></li>';
};

module.exports = {
	/**
	  * List a folder by giving html list to request response
	  */
	listFolder: function (locationPath, reqPath, req, res) {
		fs.readdir(locationPath, function (err, names) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			async.series([
				function header(seriesCallback) {
					writeHeader(res, seriesCallback);
				},
				function list(seriesCallback) {
					_.each(names, function (name) {
						if (isDirectory(locationPath, name)) {
							res.write(listDirectory(reqPath, name, res));
						} else {
							res.write(listFile(reqPath, name, res));
						}
					});
					seriesCallback();
				},
				function footer(seriesCallback) {
					writeFooter(res, seriesCallback);
				}],
				function onEnd() {
					res.end();
				});
		});
	}
};