'use strict';

module.exports = {
	description: "Generate config for @busy-web/deploy pack",

	normalizeEntityName() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	}
};
