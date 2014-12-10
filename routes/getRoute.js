var express = require('express');
var router = express.Router();

var fs = require('fs');
var locationHelper = require('../locationHelper.js');
var htmlizer = require('../htmlizer.js');

/**
  * Manage a get request
  */
router.get('\/*', function (req, res) {
	console.log(req.params[0]);
	var reqPath = req.params[0];
	var locationPath = locationHelper.getFileLocation(reqPath);
		
	fs.exists(locationPath, function (exists) {
		if (!exists) {
			res.render('list', {items: [req.url + 'doesn\'t exist']});
		} else {
			htmlizer.listFolder(locationPath, reqPath, function (itemList) {
				res.render('list', { items: itemList });
			});
		}
	});
});



module.exports = router;