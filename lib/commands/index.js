/* jshint node: true */
module.exports = {
	'deploy:branch': require('./deploy'),
	'deploy:production': require('./production'),
	'deploy:version': require('./version')
};
