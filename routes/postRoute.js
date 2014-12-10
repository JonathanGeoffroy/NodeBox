var express = require('express');
var router = express.Router();

var fs = require('fs');
var locationHelper = require('../locationHelper.js');

/**
  * Manage a post request by saving the content file into local file,
  * and returning the right answer to client:
  *   -> 200 if file is saved
  *   -> 409 if the file already exists
  */
router.post('/*', function (req, res) {
	var reqLocation = req.params[0];
	var filename = locationHelper.getFileLocation(reqLocation);
	fs.exists(filename, function (exists) {
		if (!exists) {
			locationHelper.createNonExistingFolder(req.url);
			req.pipe(fs.createWriteStream(filename));

			req.on('end', function () {
				res.send('File saved\n');
			});
		} else {
			res.writeHead(409, {'Content-Type': 'text/plain'});
			res.end(req.url + ' already exists\n');
		}
	});
});

module.exports = router;