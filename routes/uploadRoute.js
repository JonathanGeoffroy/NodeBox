var express = require('express');
var app = module.exports = express();
var multiparty = require('multiparty');
var format = require('util').format;
var fs = require('fs');
var locationHelper = require('../locationHelper.js');

/**
	* Manage a post request by saving the content file into local file,
	* and returning the right answer to client:
	*   -> 200 if file is saved
	*   -> 409 if the file already exists
	*/
app.post('/*', function (req, res, next) {
	var reqLocation = req.params[0],
		filename = locationHelper.getFileLocation(reqLocation);
	fs.exists(filename, function (exists) {
		if (!exists) {
			var form = new multiparty.Form();

			// If any error occurs, just call next to dispatch error
			form.on('error', next);

			// As soon as the form is readed, redirect the user to list
			form.on('close', function () {
				res.redirect(reqLocation.split('/').slice(0, -1).join('/'));
			});

			// listen on field event for title
			form.on('field', function (name, val) {});

			// listen on part event for file
			form.on('part', function (part) {
				part.pipe(fs.createWriteStream(filename));
			});

			 // parse the form
			form.parse(req);

		} else {
			res.render('list', {errors: [req.url + ' already exists']});
		}
	});
});