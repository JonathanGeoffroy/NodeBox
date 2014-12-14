var express = require('express');
var router = express.Router();
var fs = require('fs');

var locationHelper = require('../helpers/locationHelper.js');
var htmlizer = require('../helpers/htmlizer.js');

/**
  * Manage a GET request in order to provide an HTML list of the content of the current folder
  */
router.get('/*', function (req, res) {
	var reqPath = req.params[0],
		locationPath = locationHelper.getFileLocation(reqPath);
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