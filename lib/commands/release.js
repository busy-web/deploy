/* jshint node: true */

var Promise = require('ember-cli/lib/ext/promise');

module.exports = {
	name: 'busy:release',
	description: 'Release a build with a new verion tag in git',
	works: 'insideProject',

	availableOptions: [],

	anonymousOptions: ['<deployTarget>'],

	run: function(commandOptions, rawArgs) {
		commandOptions.deployTarget = rawArgs.shift();

		return Promise.resolve();
	}
};
