var vows = require('vows'),
	assert = require('assert');
var tmp = require('tmp');
var htmlizer = require(__dirname + "/../../helpers/htmlizer.js");
var config = require(__dirname + "/../../config.js");

// Create a Test Suite
vows.describe('htmlizer').addBatch({
	'listFolder with empty folder': {
		reqPath: '/reqPath',
		topic: function () {
			var self = this;
			tmp.dir(function _tempDirCreated(err, dirPath) {
				htmlizer.listFolder(dirPath, reqPath, function (list) {
					self.callback(err, dirPath);	
				});
			});
		},

		'should returns an empty item': function (topic) {
			var expected = {
				files: {},
				folder: {}
			};
			assert.equal(topic, expected);
		}
	}
})




.run(); // Run it