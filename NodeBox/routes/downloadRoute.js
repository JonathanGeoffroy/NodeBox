var express = require('express');
var router = express.Router();
var fstream = require('fstream');
var tar = require('tar');
var fs = require('fs');
var locationHelper = require('../helpers/locationHelper.js');

/**
  * Send the right item (file or folder) into response so user can download it
  * if locationPath points to a file, send the file content
  * create a tarball a send the tarball otherwise
  */
var download = function (locationPath, res) {
	if (locationHelper.isDirectory(locationPath)) {
		var packer = tar.Pack();

		// This must be a "directory"
		fstream.Reader({ path: locationPath, type: "Directory" })
		  .pipe(packer)
		  .pipe(res);
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