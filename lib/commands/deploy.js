/* eslint-env node */

const Promise = require('rsvp');
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
			let build = VersionUtil.getBuild();
			if (branch === 'master' && build !== 'canary') {
				return Promise.resolve("Not a release candidate of master branch");
			}

			if (build !== 'production') {
				if (builds.indexOf(build) !== -1) {
					// patch the version for new release
					this.ui.write(`Updating Version....\n`);
					let version = VersionUtil.patch();
					VersionUtil.setVersion(version);
					this.ui.write(`Version updated to ${version}.\n\n`);

					this.ui.write(`Update git repo....\n`);
					return git.updateBranch(branch, `Bumped version to ${version} [ci skip]`, this.ui).then(() => {
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
					this.ui.write('Version has bad build information');
					return Promise.resolve();
				}
			} else { // production build not on tagged branch
				this.ui.write('Production version will only release on tagged branches');
				return Promise.resolve();
			}
		} else {
			if (VersionUtil.isProduction(branch)) {
				let build = VersionUtil.getBuild();
				if (build === 'production') {
					return git.revision().then(revision => {
						this.ui.write(`ember deploy ${build}\n`);
						return ember.deploy(build).then(() => {
							this.ui.write(`ember deploy:activate --revision ${revision} ${build}\n\n`);
							return ember.activate(build, revision).then(() => {
								this.ui.write(`Deploy Complete.\n`);
								return Promise.resolve();
							});
						});
					});
				} else {
					this.ui.write('Version not set for production release');
					return Promise.resolve();
				}
			} else {
				this.ui.write('Version not released');
				return Promise.resolve();
			}
		}
	}
};
