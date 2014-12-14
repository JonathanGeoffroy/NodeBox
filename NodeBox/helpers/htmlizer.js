var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var locationHelper = require('./locationHelper.js');
var config = require('../config.js');

var computeListLink = function (name, reqPath) {
	var link = '';
	if (reqPath === '') {
		link = name;
	} else {
		link = '/' + reqPath + '/' + name;
	}
	return link;
};

var computeDownloadLink = function (name, reqPath) {
	return config.downloadBaseRoute + '/' + reqPath + '/' + name;
};

var listDirectory = function (items, dirName, reqPath) {
	// TODO: question 1.2
	// Lister un répertoire, en plaçant les bonnes informations dans la variable `items`.
};

var listFile = function (items, fileName, reqPath) {
	// TODO: question 1.2
	// Lister un fichier, en plaçant les bonnes informations dans la variable `items`.
};

module.exports = {
	/**
	  * List a folder by giving html list to request response.
	  */
	listFolder: function (locationPath, reqPath, callback) {
		fs.readdir(locationPath, function (err, names) {
			var items = {};
			items.files = {};
			items.folders = {};

			// add '..' folder if reqPath isn't ''
			if (reqPath !== '') {
				// TODO: question 1.1
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