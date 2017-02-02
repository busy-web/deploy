/* jshint node: true */
var Promise = require('ember-cli/lib/ext/promise');
const exec = require('child_process').exec;

module.exports = {
	deploy: function(build) {
		return new Promise(function(resolve, reject) {
			exec(`ember deploy ${build}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	activate: function(build, revision) {
		return new Promise(function(resolve, reject) {
			exec(`ember deploy:activate --revision ${revision} ${build}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	}
};