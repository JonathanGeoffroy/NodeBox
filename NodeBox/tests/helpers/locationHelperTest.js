var vows = require('vows'),
	assert = require('assert');
var locationHelper = require(__dirname + "/../../helpers/locationHelper.js");
var config = require(__dirname + "/../../config.js");

// Create a Test Suite
vows.describe('LocationHelper').addBatch({
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