/* eslint-env node */

const RSVP = require('rsvp');

module.exports = {
	name: 'busy:release',
	description: 'Release a build with a new verion tag in git',
	works: 'insideProject',

	availableOptions: [],

	anonymousOptions: ['<deployTarget>'],

	run: function(commandOptions, rawArgs) {
		commandOptions.deployTarget = rawArgs.shift();

		return RSVP.Promise.resolve();
	}
};
