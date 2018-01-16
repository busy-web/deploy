# @busy-web/deploy
[![npm version](https://badge.fury.io/js/busy-deploy.svg)](https://badge.fury.io/js/busy-deploy)
[![Ember Observer Score](https://emberobserver.com/badges/busy-deploy.svg)](https://emberobserver.com/addons/busy-deploy)
[![Ember badge][ember-badge]][embadge]


> An ember-cli-deploy plugin pack to implement a lightning deployment pattern as described

ember-cli-deploy package for deploying to an s3 configuration.

This plugin has a blueprint for your `config/deploy.js` file to get you started.

## Installation

```
ember install ember-cli-deploy
ember install @busy-web/deploy
```

The necessary set of plugins will be available to ember-cli-deploy and an example deploy/config.js file will be generated for you to customize with information for your deployment environments.

## What is a plugin pack?

A "plugin pack" is a concept supported by ember-cli-deploy that allows a single addon to make multiple plugins available by adding a single direct depedency to your project.

## What plugins are made available?

* [ember-cli-deploy-build](https://github.com/ember-cli-deploy/ember-cli-deploy-build)
* [ember-cli-deploy-display-revisions](https://github.com/ember-cli-deploy/ember-cli-deploy-display-revisions)
* [ember-cli-deploy-gzip](https://github.com/ember-cli-deploy/ember-cli-deploy-gzip)
* [ember-cli-deploy-manifest](https://github.com/ember-cli-deploy/ember-cli-deploy-manifest)
* [ember-cli-deploy-revision-data](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data)
* [ember-cli-deploy-s3](https://github.com/ember-cli-deploy/ember-cli-deploy-s3)
* [ember-cli-deploy-s3-index](https://github.com/ember-cli-deploy/ember-cli-deploy-s3-index)
* [ember-cli-deploy-slack](https://github.com/ember-cli-deploy/ember-cli-deploy-slack)

[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=2.7.0
