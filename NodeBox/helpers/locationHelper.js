var fs = require('fs');
var async = require('async');
var config = require('../config.js');

module.exports = {
	/**
	  * Find the location on server disk from the REST url
	  */
	getFileLocation : function (url) {
		if (url.charAt(0) === '/') {
			return config.fileLocation + url;
		}
		return config.fileLocation + '/' + url;
	},

	/**
	  * Normalize url given in parameter by:
	  *   * add a slash as first character if it's necessary,
	  *   * remove successive slashes (i.e replace two or more consecutive slash by only one)
	  */
	normalizeUrl : function(url) {
		url = url.replace(/\/{2,}/g, '/');
		if (url.charAt(0) !== '/') {
			url = '/' + url;
		}
		return url;
	},

	/**
	  * Create each folder from url if it doesn't exist
	  */
	createNonExistingFolders : function (url) {
		var path = config.fileLocation + '/';
		async.eachSeries(url.split('/'), function (folder, asyncCallback) {
			path += folder + '/';
			fs.exists(path, function (exists) {
				if (!exists) {
					fs.mkdirSync(path);
				}
				asyncCallback();
			});
		});
	},

	isDirectory: function (locationPath) {
		return fs.statSync(locationPath).isDirectory();
	},

	/**
	  * Return the name of the item contained into absolute path.
	  * for example, if locationPath equals 'folder/subFolder/file', return 'file'
	  */
	getItemName: function (locationPath) {
		var splittedLocationPath = locationPath.split('/');
		return splittedLocationPath[splittedLocationPath.length - 1];
	}
};