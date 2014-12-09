var fs = require('fs');
var locationHelper = require('./locationHelper.js');
var htmlizer = require('./htmlizer.js');

module.exports = {

	/**
	  * Manage a get request
	  */
	getRequest : function (req, res) {
		var locationPath = locationHelper.getFileLocation(req.url);
		fs.exists(locationPath, function (exists) {
			if (!exists) {
				res.writeHead(409, {'Content-Type': 'text/plain'});
				res.end(req.url + ' doesn\'t exist\n');
			} else {
				htmlizer.listFolder(locationPath, req.url, req, res);
			}
		});
	}
};