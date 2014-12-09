var fs = require('fs');
var locationHelper = require('./locationHelper.js');

module.exports = {

	/**
	  * Manage a post request by saving the content file into local file,
	  * and returning the right answer to client:
	  *   -> 200 if file is saved
	  *   -> 409 if the file already exists
	  */
	postRequest : function (req, res) {
		var filename = locationHelper.getFilename(req.url);
		fs.exists(filename, function (exists) {
			if (!exists) {
				locationHelper.createNonExistingFolder(req.url);
				req.pipe(fs.createWriteStream(filename));

				req.on('end', function () {
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end('File saved\n');
				});
			} else {
				res.writeHead(409, {'Content-Type': 'text/plain'});
				res.end(req.url + ' already exists\n');
			}
		});
	}
};