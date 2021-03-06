var fs = require('fs');
var async = require('async');
var config = require('../config.js');

module.exports = {
	/**
	  * Find the location on server disk from the REST url.
	  */
	getFileLocation : function (url) {
		if (url.charAt(0) === '/') {
			return config.fileLocation + url;
		}
		return config.fileLocation + '/' + url;
	},

	/**
	  * Normalize url given in parameter by:
	  *   * adding a slash as first character if it's necessary,
	  *   * removing successive slashes (i.e replace two or more consecutive slashes by only one)
	  */
	normalizeUrl : function(url) {
		url = url.replace(/\/{2,}/g, '/');
		if (url.charAt(0) !== '/') {
			url = '/' + url;
		}
		return url;
	},
	
	/**
	  * Create each folder from url if it doesn't exist.
	  */
	createNonExistingFolders : function (url) {
		// TODO: question 3
		// Créer le/les dossier(s) manquant(s) à partir de l'url.
	},

	isDirectory: function (locationPath) {
		// TODO: vérifier si locationPath pointe sur un répertoire.
		return false;
	},

	/**
	  * Return the name of the item contained into absolute path.
	  * For example, if locationPath equals 'folder/subFolder/file', return 'file'.
	  */
	getItemName: function (locationPath) {
		var splittedLocationPath = locationPath.split('/');
		return splittedLocationPath[splittedLocationPath.length - 1];
	}
};