/* jshint node: true */
var Promise = require('ember-cli/lib/ext/promise');
const exec = require('child_process').exec;

module.exports = {
	revision: function() {
		return new Promise(function(resolve, reject) {
			exec("git log -1 --format=%H", function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout.slice(0, 7));
			});
		});
	},

	commit: function(message) {
		console.log(` - git commit -am ${message}`);
		return new Promise(function(resolve, reject) {
			exec(`git commit -am '${message}'`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	checkout: function(branch) {
		console.log(` - git checkout ${branch}`);
		return new Promise(function(resolve, reject) {
			exec(`git checkout ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	pull: function(branch, remote="origin") {
		console.log(` - git pull ${remote} ${branch}`);
		return new Promise(function(resolve, reject) {
			exec(`git pull ${remote} ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	push: function(branch, remote="origin") {
		console.log(` - git push ${remote} ${branch}`);
		return new Promise(function(resolve, reject) {
			exec(`git push ${remote} ${branch}`, function(err, stdout) {
				if (err instanceof Error) {
					reject(err);
				}
				resolve(stdout);
			});
		});
	},

	updateBranch(branch, message) {
		return this.checkout(branch).then(() => {
			return this.pull(branch).then(() => {
				return this.commit(message).then(() => {
					return this.push(branch);
				});
			});
		});
	}
};
