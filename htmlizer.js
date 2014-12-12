var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var locationHelper = require('./locationHelper.js');
var config = require('./config.js');

var listLink = function (name, reqPath) {
	var link = '';
	if (reqPath === '') {
		link = name;
	} else {
		link = '/' + reqPath + '/' + name;
	}
	return link;
};

var downloadLink = function (name, reqPath) {
	return config.downloadBaseRoute + reqPath + '/' + name;
};

var listDirectory = function (items, dirName, reqPath) {
	items.folders[dirName] = {};
	items.folders[dirName].listLink = listLink(dirName, reqPath);
	items.folders[dirName].downloadLink = downloadLink(dirName, reqPath);
};

var listFile = function (items, fileName, reqPath) {
	items.files[fileName] = {};
	items.files[fileName].downloadLink = downloadLink(fileName, reqPath);
};

module.exports = {
	/**
	  * List a folder by giving html list to request response
	  */
	listFolder: function (locationPath, reqPath, callback) {
		fs.readdir(locationPath, function (err, names) {
			var items = {};
			items.files = {};
			items.folders = {};

			// add '..' folder if reqPath isn't '/'
			if (reqPath !== '') {
				items.folders['..'] = {};
				items.folders['..'].listLink = '/' + reqPath.split('/').slice(0, -1).join('/');
			}

			// List each item
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