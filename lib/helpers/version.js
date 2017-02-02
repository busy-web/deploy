/* jshint node: true */
const fs = require('fs');

module.exports = {
	_package: null,
	package: null,

	getVersion: function() {
		if (this.package === null) {
			this._package = (fs.readFileSync('./package.json')).toString();
			this.package = JSON.parse(this._package);
		}
		return this.package.version;
	},

	setVersion: function(version) {
		var oldVersion = this.getVersion();
		if (version !== oldVersion && this.isValid()) {
			this.package.version = version;
			this._package = this._package.replace('"version": "' + oldVersion + '"', '"version": "' + version + '"');
			fs.writeFileSync('./package.json', this._package);
			fs.writeFileSync('./public/version.json', '{"version": "' + version + '"}');
		}
	},

	getBuild: function() {
		var parts = (this.getVersion()).split('.')[2];
		if (parts) {
			parts = parts.split('-')[1];
			if (parts) {
				return parts;
			} else {
				return 'production';
			}
		}
		return false;
	},

	setBuild: function(type) {
		var parts = (this.getVersion()).split('.');
		if (type === 'production' || type === 'prod') {
			parts = [parts[0], parts[1], 0];
		} else {
			var build = [0, type];
			parts[2] = build.join('-');
			parts[3] = 0;
		}
		return parts.join('.');
	},

	patch: function() {
		return this.incrementVersion();
	},

	minor: function() {
		return this.incrementVersion(1);
	},

	major: function() {
		return this.incrementVersion(0);
	},

	incrementVersion(index) {
		if (this.isValid()) {
			var parts = this.package.version.split('.');
			index = index !== undefined ? index : parts.length-1;
			for(var i=index; i<parts.length; i++) {
				var nums = parts[i].split('-');
				nums[0] = (i === index ? Number(nums[0]) + 1 : 0);
				parts[i] = nums.join('-');
			}
			return parts.join('.');
		}
		return false;
	},

	isValid() {
		var version = this.getVersion();
		if (version !== null || version !== undefined) {
			if (/\d+\.\d+/.test(version)) {
				return true;
			}
		}
		return false;
	},

	isMatch(version) {
		var parts = (this.getVersion()).split('.');
		var testParts = version.split('.');
		console.log('version', testParts[0], parts[0], testParts[1], parts[1]);
		return (testParts[0] === parts[0] || testParts[0] === 'v' + parts[0]) && testParts[1] === parts[1];
	}
};
