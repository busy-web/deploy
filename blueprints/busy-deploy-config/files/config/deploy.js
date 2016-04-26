/* jshint node: true */
require('dotenv').load();
var config = require('./environment')();

module.exports = function(deployTarget)
{
	var ENV = {
		build: {},

		"revision-data": {
			type: 'git-commit'
		},

		s3: {
			accessKeyId: null /* YOUR S3 PUBLIC ACCESS KEY */,
			secretAccessKey: process.env['AWS_ACCESS_KEY'], // the secret key should be stored in a dotenv file for security.
			region: 'us-west-1', // change region if needed
			acl: 'public-read',
			exclude: ['.DS_Store', '.gitkeep', '.htaccess'],
		},

		"s3-index": {
			accessKeyId: null /* YOUR S3 PUBLIC ACCESS KEY */,
			secretAccessKey: process.env['AWS_ACCESS_KEY'], // the secret key should be stored in a dotenv file for security.
			region: 'us-west-1', // change region if needed
			acl: 'public-read',
			indexMode: 'indirect',
		},

		slack: {
			webhookURL: null /* YOUR SLACK URL */,
			channel: null /* YOUR SLACK CHANNEL */,
			username: null /* YOUR SLACK USER */,
			willDeploy: function() {
				return function() {
					return {
						slackStartDeployDate: new Date()
					};
				};
			},
			didActivate: function(context) {
				return function(slack) {
					return slack.notify({
						attachments: [{
							"fallback": "Deployment Activated",
							"pretext": "Deployment Activated",
							"color": "good",
							"fields": [
								{"title": "Build Type", "value": context.deployTarget, "short": false},
								{"title": "Build Revision", "value": context.commandOptions.revision, "short": false}
							]
						}]
					});
				};
			},
			didDeploy: function(context) {
				return function(slack) {
					var start = context.slackStartDeployDate;
					var end = new Date();
					var duration = (end - start) / 1000;

					return slack.notify({
						attachments: [{
							"fallback": "Deployment finished! New revision was successfully uploaded.",
							"pretext": "Deployment finished! New revision was successfully uploaded.",
							"color": "good",
							"fields": [
								{"title": "Build Type", "value": context.deployTarget, "short": false},
								{"title": "Build Version", "value": config.APP.VERSION, "short": false},
								{"title": "Build Time", "value": duration, "short": false},
								{"title": "Build Revision", "value": context.revisionData.revisionKey, "short": false}
							]
						}]
					});
				};
			}
		}
	};

	if(deployTarget === 'beta')
	{
		ENV.build.environment = 'beta';

		/**
		 * NOTE:
		 * This beta target is setup with a prefix allowing the content
		 * and index buckets to be the same with a folder structure inside
		 * to seperate the content from the index files.
		 */

		ENV.s3.bucket = null /* YOUR S3 CONTENT BUCKET */;
		ENV.s3.prefix = 'beta/content';

		ENV['s3-index'].bucket = null /* YOUR S3 INDEX BUCKET */;
		ENV['s3-index'].prefix = 'beta/public';
	}

	if(deployTarget === 'production')
	{
		ENV.build.environment = 'production';

		/**
		 * NOTE:
		 * This production target is setup without a prefix so the content
		 * and index buckets will be seperate buckets.
		 */

		ENV.s3.bucket = null /* YOUR S3 CONTENT BUCKET */;
		ENV.s3.prefix = '';

		ENV['s3-index'].bucket = null /* YOUR S3 INDEX BUCKET */;
		ENV['s3-index'].prefix = '';
	}

	// Note: if you need to build some configuration asynchronously, you can return
	// a promise that resolves with the ENV object instead of returning the
	// ENV object synchronously.
	return ENV;
};
