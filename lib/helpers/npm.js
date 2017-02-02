/* jshint node: true */
const Promise = require('ember-cli/lib/ext/promise');
const VersionUtil = require('../helpers/version');
const exec = require('child_process').exec;

module.exports = {
	tag: function() {
		return new Promise(function(resolve, reject) {
			exec("npm version patch", function(err) {
				if (err instanceof Error) {
					reject(err);
				}

				var ver = VersionUtil.getVersion();
				VersionUtil.saveVersion(ver);

				resolve(ver);
			});
		});
	},
};
