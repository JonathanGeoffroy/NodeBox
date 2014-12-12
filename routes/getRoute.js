var express = require('express');
var router = express.Router();

var fs = require('fs');
var mime = require('mime');

var locationHelper = require('../locationHelper.js');
var htmlizer = require('../htmlizer.js');
var config = require('../config.js');


/**
  * Send the right item (file or folder) into response so user can download it
  * if locationPath points to a file, send the file content
  * create a tarball a send the tarball otherwise
  */
var download = function (locationPath, res) {
	if (locationHelper.isDirectory(locationPath)) {

	} else {
		res.sendFile(locationPath, {root: __dirname + '/../' });
	}
};

/**
  * Manage a get request in order to download the item.
  */
router.get('/download/*', function (req, res) {
	var reqPath = req.params[0];
	var locationPath = locationHelper.getFileLocation(reqPath);
	fs.exists(locationPath, function (exists) {
		if(!exists) {
			res.render('list', {errors: [req.url + 'doesn\'t exist']});
		} else {
			download(locationPath, res);
		}
	});
});

/**
  * Manage a get request in order to provide an HTML list concerning the current folder
  */
router.get('/*', function (req, res) {
	var reqPath = req.params[0];
	var locationPath = locationHelper.getFileLocation(reqPath);
	fs.exists(locationPath, function (exists) {
		if (!exists || !locationHelper.isDirectory(locationPath)) {
			res.render('list', {errors: [req.url + 'doesn\'t exist']});
		} else {
			htmlizer.listFolder(locationPath, reqPath, function (itemList) {
				console.log(itemList);
				res.render('list', itemList);
			});
		}
	});
});

module.exports = router;