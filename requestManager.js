var fs = require('fs');
var _ = require('underscore');
var htmlizer = require('./htmlizer.js');

var fileLocation = './files';

module.exports = {

	/**
	  * Find the filename from the REST url
	  */
	getFilename : function (url) {
		if (url.charAt(0) === '/') {
			return fileLocation + url;
		}
		return fileLocation + '/' + url;
	},

	/**
	  * Create each folder from url if it doesn't exist
	  */
	createNonExistingFolder : function (url) {
		var path = fileLocation + '/';
		_.each(url.split('/').slice(1, -1), function (folder) {
			fs.exists(path, function (exists) {
				if (!exists) {
					path += folder + '/';
					fs.mkdirSync(path);
				}
			});
		});
	}
}