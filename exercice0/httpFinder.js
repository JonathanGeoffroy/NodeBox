var https = require('https');

var nbTotal = 0;
var NUMBER_OF_FILES_PARSED_SIMULTANEOUSLY = 8;
var wordToFind = /github/g;
var path = "./resources/exercice0/";


https.get("https://github.com", function onResult(res) {
	res.on('data', function (chunk) {
		var nb = 0,
			matching = chunk.toString().match(wordToFind);
		if (matching) {
			nb = matching.length;
			nbTotal += nb;
		}
		console.log('nombre de ' + wordToFind + ' dans ce morceau : ' + nb);
	});
	res.on('end', function () {
		console.log('nombre de ' + wordToFind + ' dans le dossier : ' + nbTotal);
	});
});