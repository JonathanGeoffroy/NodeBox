var fs = require('fs');
var _ = require('underscore');
var async = require('async');

var nbTotal = 0;
var NUMBER_OF_FILES_PARSED_SIMULTANEOUSLY = 8;
var wordToFind = /adi/g;
var path = "./resources/exercice0/";

fs.readdir(path, function (err, filesInDir) {
	async.eachLimit(filesInDir, NUMBER_OF_FILES_PARSED_SIMULTANEOUSLY,
		function readFile(filename, asyncCallback) {
			var nb = 0;
			fs.readFile(path + filename, function (err, data) {
				nb = data.toString().match(wordToFind).length;
				nbTotal += nb;
				console.log('nombre de ' + wordToFind + ' dans ' + filename + ' : ' + nb);
				asyncCallback();
			});
		}, function onEnd() {
			console.log('nombre de ' + wordToFind + ' dans le dossier : ' + nbTotal);
		});
});