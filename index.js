'use strict';
var commands = require('./lib/commands');

module.exports = {
  name: 'busy-deploy',

	includedCommands: function() {
		return commands;
	},
};
