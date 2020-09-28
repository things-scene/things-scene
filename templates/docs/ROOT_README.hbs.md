[comment]: # 'NOTE: This file is generated and should not be modify directly. Update `templates/ROOT_README.hbs.md` instead'

# Things Scene

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.org/things-scene/things-scene.svg?branch=master)](https://travis-ci.org/things-scene/things-scene)
[![codecov](https://codecov.io/gh/things-scene/things-scene/branch/master/graph/badge.svg)](https://codecov.io/gh/things-scene/things-scene)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Micro Modules for ThingsScene.

These modules compose together to help you create performant modern JS apps that you love to develop and test. These packages are developed primarily to be used on top of the stack we like best for our JS apps; Typescript for the flavor, Koa for the server, LitElement for UI, Apollo for data fetching, and Jest for tests. That said, you can mix and match as you like.

## Usage

The things-scene repo is managed as a monorepo that is composed of {{jsPackages.length}} npm packages.
Each package has its own `README.md` and documentation describing usage.

### Package Index

| Package | Version | Description |
| ------- | ------- | ----------- |
{{#each jsPackages}}
| [{{name}}](packages/{{name}}) | <a href="https://badge.fury.io/js/%40things-scene%2F{{name}}"><img src="https://badge.fury.io/js/%40things-scene%2F{{name}}.svg" width="200px" /></a> | {{{description}}} |
{{/each}}

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## License

MIT &copy; [Hatiolab](https://www.hatiolab.com/), see [LICENSE](LICENSE.md) for details.

<a href="http://www.hatiolab.com/"><img src="https://www.hatiolab.com/assets/img/logo.png" alt="Hatiolab" width="200" /></a>
