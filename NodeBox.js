var http = require('http');
var getRoot = require('./getRoot.js')
var postRoot = require('./postRoot.js')

/*
 * Create a server which listen for GET and POST requests,
 * and dispatch each request to the right function.
 */
http.createServer(function (req, res) {
	switch (req.method) {
	case 'GET':
		getRoot.getRequest(req, res);
		break;
	case 'POST':
		postRoot.postRequest(req, res);
		break;
	default:
		res.writeHead(403, {'Content-Type': 'text/plain'});
		res.end();
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');