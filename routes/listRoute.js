var express = require('express');
var router = express.Router();
var fs = require('fs');

var locationHelper = require('../locationHelper.js');
var htmlizer = require('../htmlizer.js');

/**
  * Manage a get request in order to provide an HTML list concerning the current folder
  */
router.get('/*', function (req, res) {
	var reqPath = req.params[0];
	var locationPath = locationHelper.getFileLocation(reqPath);
	fs.exists(locationPath, function (exists) {
		if (!exists || !locationHelper.isDirectory(locationPath)) {
			res.render('list', {errors: [req.url + ' doesn\'t exist']});
		} else {
			htmlizer.listFolder(locationPath, reqPath, function (itemList) {
				res.render('list', itemList);
			});
		}
	});
});

module.exports = router;