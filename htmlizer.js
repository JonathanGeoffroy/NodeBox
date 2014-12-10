var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var config = require('./config.js');

var isDirectory = function (locationPath, name) {
	return fs.statSync(locationPath + '/' + name).isDirectory();
};

var listDirectory = function (items, dirName, reqPath) {
	var link = reqPath + '/' + dirName;
	items[dirName] = link;
};

var listFile = function (items, fileName, reqPath) {
	var link = reqPath + '/' + fileName;
	items[fileName] = link;
};

module.exports = {
	/**
	  * List a folder by giving html list to request response
	  */
	listFolder: function (locationPath, reqPath, callback) {
		fs.readdir(locationPath, function (err, names) {
			var items = {};
			_.each(names, function (name) {
				console.log(names);
				if (isDirectory(locationPath, name)) {
					listDirectory(items, name, reqPath);
				} else {
					listFile(items, name, reqPath);
				}
			});
			console.log(items);
			callback(items);
		});
	}
};