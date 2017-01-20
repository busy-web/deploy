/* jshint node: true */

var Promise = require('ember-cli/lib/ext/promise');
const VersionUtil = require('../helpers/version');
const git = require('../helpers/git');
const ember = require('../helpers/ember');

const builds = ['canary', 'alpha', 'beta', 'staging'];

module.exports = {
	name: 'deploy:branch',
	description: 'Deploy a builds based on a release branch that must match the major and minor version with a build type in the version in package.json',
	works: 'insideProject',

	availableOptions: [],

	anonymousOptions: ['<branch>'],

	run: function(commandOptions, rawArgs) {
		var branch = rawArgs.shift();
		if (VersionUtil.isMatch(branch) || branch === 'master') {
			var build = VersionUtil.getBuild();
			if (branch === 'master' && build !== 'canary') {
				return Promise.reject("Not a release candidate of master branch");
			}

			if (builds.indexOf(build) !== -1) {
				// patch the version for new release
				this.ui.write(`Updating Version....\n`);
				var version = VersionUtil.patch();
				VersionUtil.setVersion(version);
				this.ui.write(`Version updated to ${version}.\n\n`);

				this.ui.write(`Update git repo....\n`);
				return git.updateBranch(branch, `Bumped version to ${version} [ci skip]`).then(() => {
					this.ui.write(`Update git complete.\n\n`);
					return git.revision().then(revision => {
					this.ui.write(`Build for ${build} and deploy revision ${revision}.\n\n`);
						this.ui.write(`ember deploy ${build}\n`);
						return ember.deploy(build).then(() => {
							this.ui.write(`ember deploy:activate --revision ${revision} ${build}\n\n`);
							return ember.activate(build, revision).then(() => {
								this.ui.write(`Deploy Complete.\n`);
								return Promise.resolve();
							});
						});
					});
				});
			} else {
				return Promise.reject('Version has bad build information');
			}
		} else {
			return Promise.reject('Version not released');
		}
	}
};
