var express = require('express');
var router = express.Router();

var fs = require('fs');
var locationHelper = require('../locationHelper.js');
var htmlizer = require('../htmlizer.js');


var list = function (locationPath, reqPath, req, res) {
	fs.exists(locationPath, function (exists) {
		if (!exists) {
			res.send(req.url + ' doesn\'t exist\n');
		} else {
			htmlizer.listFolder(locationPath, reqPath, req, res);
		}
	});
};

/**
  * Manage a get request
  */
router.get('\/*', function (req, res) {
	console.log(req.params[0]);
	var reqDirectory = req.params[0];
	var locationPath = locationHelper.getFileLocation(reqDirectory);
	
	list(locationPath, reqDirectory, req, res);
});



module.exports = router;