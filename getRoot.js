var fs = require('fs');
var requestManager = require('./requestManager.js');
var htmlizer = require('./htmlizer.js');

module.exports = {

	/**
	  * Manage a get request
	  */
	getRequest : function (req, res) {
		var filename = requestManager.getFilename(req.url);
		fs.exists(filename, function (exists) {
			if (!exists) {
				res.writeHead(409, {'Content-Type': 'text/plain'});
				res.end(req.url + ' doesn\'t exist\n');
			} else {
				htmlizer.listFolder(filename, req, res);
			}
		});
	}
}