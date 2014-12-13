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
	  * Create each folder from url if it doesn't exist
	  */
	createNonExistingFolders : function (url) {
		console.log(url);
		var path = config.fileLocation + '/';
		async.eachSeries(url.split('/'), function (folder, asyncCallback) {
			path += folder + '/';
			console.log(path);
			fs.exists(path, function (exists) {
				if (!exists) {
					fs.mkdirSync(path);
					console.log('created: ' + path);
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