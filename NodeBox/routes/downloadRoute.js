var express = require('express');
var router = express.Router();
var archiver = require('archiver');
var fs = require('fs');
var locationHelper = require('../helpers/locationHelper.js');


/**
  * Create a zip file which contains the content of `locationPath`,
  * and send it to client
  */
var sendZip = function (locationPath, res) {
	var archive = archiver('zip'),
		archiveName = locationHelper.getItemName(locationPath);

	archive.pipe(res);
	archive.bulk([
		{ expand: true, cwd: locationPath, src: ['**'], dest: archiveName}
	]);
	archive.finalize();
};

/**
  * Send the right item (file or folder) into response so user can download it
  * if locationPath points to a file, send the file content
  * create a tarball a send the tarball otherwise
  */
var download = function (locationPath, res) {
	if (locationHelper.isDirectory(locationPath)) {
		sendZip(locationPath, res);
	} else {
		res.sendFile(locationPath, {root: __dirname + '/../' });
	}
};

/**
  * Manage a get request in order to download the item.
  */
router.get('/*', function (req, res) {
	var reqPath = req.params[0],
		locationPath = locationHelper.getFileLocation(reqPath);
	fs.exists(locationPath, function (exists) {
		if (!exists) {
			res.render('list', {errors: [req.url + ' doesn\'t exist']});
		} else {
			download(locationPath, res);
		}
	});
});

module.exports = router;