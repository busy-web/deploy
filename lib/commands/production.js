/* eslint-env node */

const RSVP = require('rsvp');
const npmUtil = require('../helpers/npm');
const gitUtil = require('../helpers/git');

module.exports = {
	name: 'deploy:production',
	description: 'Update the package version and commit it to the repo for production builds',
	works: 'insideProject',

	availableOptions: [],

	anonymousOptions: ['<remote>'],

	run: function(commandOptions, rawArgs) {
		var remote = rawArgs.shift();
		return npmUtil.tag().then(version => {
			if (version) {
				return gitUtil.commit("Production release [ " + version + " ] [ci skip]").then(() => {
					this.ui.write("Release: " + version + "\n\n");
					if (remote) {
						return gitUtil.push('--tags', remote).then(() => {
							this.ui.write("Production deploy pushed to " + remote + " v" + version + "\n");
							return RSVP.Promise.resolve();
						});
					} else {
						this.ui.write("Use: `git push <remote> --tags` to deploy\n");
						return RSVP.Promise.resolve();
					}
				});
			} else {
				return RSVP.Promise.reject("busy:version takes no arg or <patch> <minor> <major> or <build> as an argument");
			}
		});
	}
};
