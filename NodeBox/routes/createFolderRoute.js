var express = require('express');
var router = express.Router();
var fs = require('fs');
var locationHelper = require('../helpers/locationHelper.js');

/**
  * Manage a post request in order to create new folders.
  */
router.post('/*', function (req, res) {
	var reqLocation = req.params[0],
		locationPath = locationHelper.getFileLocation(reqLocation);
	fs.exists(locationPath, function (exists) {
		if (!exists) {
			locationHelper.createNonExistingFolders(reqLocation);
		}
		res.redirect(locationHelper.normalizeUrl(reqLocation));
	});
});

module.exports = router;