/* eslint-env node */

const RSVP = require('rsvp');
const exec = require('child_process').exec;

module.exports = {
	deploy: function(build) {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`ember deploy ${build}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	activate: function(build, revision) {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`ember deploy:activate --revision ${revision} ${build}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	}
};
