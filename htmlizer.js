var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var config = require('./config.js');
var locationHelper = require('./locationHelper.js');

var listDirectory = function (items, dirName, reqPath) {
	var link = reqPath + '/' + dirName;
	items.folders[dirName] = link;
};

var listFile = function (items, fileName, reqPath) {
	items.files.push(fileName);
};

module.exports = {
	/**
	  * List a folder by giving html list to request response
	  */
	listFolder: function (locationPath, reqPath, callback) {
		fs.readdir(locationPath, function (err, names) {
			var items = {};
			items.files = [];
			items.folders = {};

			// add '..' folder if reqPath ins't '/'
			if (reqPath !== '') {
				items.folders['..'] = '/' + reqPath.split('/').slice(0, -1).join('/');
			}
			_.each(names, function (name) {
				if (locationHelper.isDirectory(locationPath + '/' + name)) {
					listDirectory(items, name, reqPath);
				} else {
					listFile(items, name, reqPath);
				}
			});
			callback(items);
		});
	}
};