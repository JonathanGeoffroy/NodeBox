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
		// TODO: question 4.4:
		// Compressez le contenu du dossier demandé par l'utilisateur,
		// puis envoyez le fichier compressé créé à l'utilisateur.
		// Pensez à utiliser des Stream si vous le pouvez!
	} else {
		// TODO: question 4.3:
		// Envoyez le fichier demandé par l'utilisateur
	}
};

/**
  * Manage a get request in order to download the item.
  */
router.get('/*', function (req, res) {
	console.log('download');
	var reqPath = req.params[0],
		locationPath = locationHelper.getFileLocation(reqPath);
	// TODO: question 4.2:
	// Si le fichier/dossier existe, appelez la fonction `download`,
	// Sinon, redirigez vers la page `liste` en précisant l'erreur
});

module.exports = router;