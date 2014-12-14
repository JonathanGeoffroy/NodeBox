var vows = require('vows'),
	assert = require('assert');
var tmp = require('tmp');
var locationHelper = require(__dirname + "/../../helpers/locationHelper.js");
var config = require(__dirname + "/../../config.js");

// Create a Test Suite
vows.describe('LocationHelper.getFileLocation').addBatch({
	'when we search the FileLocation of root': {
		topic: function () {
			return locationHelper.getFileLocation('/');
		},

		'we get config.fileLocation': function (topic) {
			assert.equal(topic, config.fileLocation + '/');
		}
	},
	'when we search for another location which begins by slash': {
		topic: function () {
			return locationHelper.getFileLocation('/theLocation');
		},

		'we get config.fileLocation, followed by': {
			'the location': function (topic) {
				assert.equal(topic, config.fileLocation + '/theLocation');
			}
		}
	},
	'when we search for another location which begins by another character': {
		topic: function () {
			return locationHelper.getFileLocation('theLocation');
		},
		'we also get config.gileLocation, followed by' : {
			'/ the location': function (topic) {
				assert.equal(topic, config.fileLocation + '/theLocation');
			}
		}
	}
}).run(); // Run it


vows.describe('LocationHelper.normalizeUrl').addBatch({
	'when we normalize empty url': {
		topic: function () {
			return locationHelper.normalizeUrl('');
		},

		'we get root url': function (topic) {
			assert.equal(topic, '/');
		}
	},
	'when we normalize root url': {
		topic: function () {
			return locationHelper.normalizeUrl('/');
		},

		'we get root url': function (topic) {
			assert.equal(topic, '/');
		}
	},
	'when we normalize url which too slashes, which begin by a slash': {
		topic: function () {
			return locationHelper.normalizeUrl('/first//second');
		},

		'we get url which begin by slash, but unnecessary slahes are removed': function (topic) {
			assert.equal(topic, '/first/second');
		}
	},
	'when we normalize url which too slashes, which begin by another character': {
		topic: function () {
			return locationHelper.normalizeUrl('first///second');
		},

		'we get url which begin by slash, but unnecessary slahes are removed': function (topic) {
			assert.equal(topic, '/first/second');
		}
	}
}).run(); // Run it

vows.describe('LocationHelper.isDirectory').addBatch({
	'when we call isDirectory with a directory': {
		topic: function () {
			var self = this;
			tmp.dir(function _tempDirCreated(err, dirPath) {
				self.callback(err, locationHelper.isDirectory(dirPath));
			});
		},

		'it responds true': function (topic) {
			assert.equal(topic, true);
		}
	},
	'but when we call isDirectory with a file': {
		topic: function () {
			var self = this;
			tmp.file(function _tempDirCreated(err, filePath) {
				self.callback(err, locationHelper.isDirectory(filePath));
			});
		},

		'it responds false': function (topic) {
			assert.equal(topic, false);
		}
	}
}).run(); // Run it

vows.describe('LocationHelper.getItemName').addBatch({
	'The item name of root': {
		topic: function () {
			return locationHelper.getItemName('/');
		},

		'should be an empty string': function (topic) {
			assert.equal(topic, '');
		}
	},
	'The item name of a string without any slash': {
		topic: function () {
			return locationHelper.getItemName('theString');
		},

		'shoud be the string itself': function (topic) {
			assert.equal(topic, "theString");
		}
	},
	'The item name of a string which contains a slash': {
		topic: function () {
			return locationHelper.getItemName('theFirst/theSecond');
		},

		'shoud be the second par of the string': function (topic) {
			assert.equal(topic, "theSecond");
		}
	},
	'The item name of a string which contains two slashes': {
		topic: function () {
			return locationHelper.getItemName('theFirst/theSecond/theThird');
		},

		'shoud be the last par of the string': function (topic) {
			assert.equal(topic, "theThird");
		}
	}
}).run(); // Run it