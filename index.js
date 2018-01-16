'use strict';
var commands = require('./lib/commands');

module.exports = {
  name: '@busy-web/deploy',

	includedCommands: function() {
		return commands;
	},
};
