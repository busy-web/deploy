/* eslint-env node */

const RSVP = require('rsvp');
const exec = require('child_process').exec;

module.exports = {
	revision: function() {
		return new RSVP.Promise(function(resolve, reject) {
			exec("git log -1 --format=%H", function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout.slice(0, 7));
			});
		});
	},

	commit: function(message) {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`git commit -am '${message}'`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	checkout: function(branch) {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`git checkout ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	pull: function(branch, remote="origin") {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`git pull ${remote} ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	push: function(branch, remote="origin") {
		return new RSVP.Promise(function(resolve, reject) {
			exec(`git push ${remote} ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	updateBranch(branch, message, ui) {
		ui.write(` - git checkout ${branch}`);
		return this.checkout(branch).then(() => {
			ui.write(` - git pull origin ${branch}`);
			return this.pull(branch).then(() => {
				ui.write(` - git commit -am ${message}`);
				return this.commit(message).then(() => {
					ui.write(` - git push origin ${branch}`);
					return this.push(branch);
				});
			});
		});
	}
};
