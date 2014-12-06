var http = require('http');
var fs = require('fs');
var _ = require('underscore');

var fileLocation = './files';

/**
  * Find the filename from the REST url
  */
var getFilename = function (url) {
	if (url.charAt(0) === '/') {
		return fileLocation + url;
	}
	return fileLocation + '/' + url;
};

/**
  * Create each folder from url if it doesn't exist
  */
var createNonExistingFolder = function (url) {
	var path = fileLocation + '/';
	_.each(url.split('/').slice(1, -1), function (folder) {
		fs.exists(path, function (exists) {
			if (!exists) {
				path += folder + '/';
				fs.mkdirSync(path);
			}
		});
	});
};

/**
  * Manage a post request by save the content file into local file,
  * and return the right answer to client:
  *   -> 200 if file is saved
  *   -> 409 if the file already exists
  */
var postRequest = function (req, res) {
	var filename = getFilename(req.url);
	fs.exists(filename, function (exists) {
		if (!exists) {
			createNonExistingFolder(req.url);
			req.pipe(fs.createWriteStream(filename));

			req.on('end', function () {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('File saved\n');
			});
		} else {
			res.writeHead(409, {'Content-Type': 'text/plain'});
			res.end(req.url + ' already exists\n');
		}
	});
};

/*
 * Create a server which listen for GET and POST requests,
 * and dispatch each request to the right function.
 */
http.createServer(function (req, res) {
	switch (req.method) {
	case 'POST':
		postRequest(req, res);
		break;
	default:
		res.writeHead(403, {'Content-Type': 'text/plain'});
		res.end();
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');