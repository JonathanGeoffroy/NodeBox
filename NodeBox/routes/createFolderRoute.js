var express = require('express');
var router = express.Router();
var fs = require('fs');
var locationHelper = require('../helpers/locationHelper.js');

/**
  * Manage a POST request in order to create new folders.
  */
router.post('/*', function (req, res) {
	console.log('createFolder');
	var reqLocation = req.params[0],
		locationPath = locationHelper.getFileLocation(reqLocation);
	// TODO: question 3
});

module.exports = router;