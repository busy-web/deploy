/* jshint node: true */

const Promise = require('ember-cli/lib/ext/promise');
const VersionUtil = require('../helpers/version');

module.exports = {
	name: 'busy:version',
	description: 'Update the package version and commit it to the repo',
	works: 'insideProject',

	availableOptions: [],

	anonymousOptions: ['<patch|minor|major>'],

	run: function(commandOptions, rawArgs) {
		var command = rawArgs.shift();

		var version;
		if (command === 'patch') {
			version = VersionUtil.patch();
			VersionUtil.setVersion(version);
		} else if (command === 'minor') {
			version = VersionUtil.minor();
			VersionUtil.setVersion(version);
		} else if (command === 'major') {
			version = VersionUtil.major();
			VersionUtil.setVersion(version);
		} else if (command === 'build') {
			var build = rawArgs.shift();
			if (build === undefined) {
				version = VersionUtil.getBuild();
			} else {
				version = VersionUtil.setBuild(build);
				VersionUtil.setVersion(version);
			}
		} else if (command === undefined) {
			version = VersionUtil.getVersion();
		}

		if (version) {
			this.ui.write(version + "\n");
			return Promise.resolve();
		} else {
			return Promise.reject("busy:version takes no arg or <patch> <minor> <major> or <build> as an argument");
		}
	}
};
