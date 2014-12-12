var fs = require('fs');
var _ = require('underscore');
var config = require('./config.js');

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
	createNonExistingFolder : function (url) {
		var path = config.fileLocation + '/';
		_.each(url.split('/').slice(1, -1), function (folder) {
			fs.exists(path, function (exists) {
				if (!exists) {
					path += folder + '/';
					fs.mkdirSync(path);
				}
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