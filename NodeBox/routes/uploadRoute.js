var express = require('express');
var app = module.exports = express();
var multiparty = require('multiparty');
var format = require('util').format;
var fs = require('fs');
var locationHelper = require('../helpers/locationHelper.js');

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

			// As soon as the form is read, redirect the user to list
			form.on('close', function () {
				// TODO: question 2.2
				// Rediriger l'utilisateur vers le listing du dossier
				// où à été envoyé le fichier.
			});

			// listen on field event for title
			form.on('field', function (name, val) {});

			// listen on part event for file
			form.on('part', function (part) {
				// TODO: question 2.1
				// récupérez les données envoyées par l'utilisateur,
				// et les stocker dans un fichier sur le disque du serveur
			});

			 // parse the form
			form.parse(req);

		} else {
			res.render('list', {errors: [req.url + ' already exists']});
		}
	});
});