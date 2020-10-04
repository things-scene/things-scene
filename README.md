[comment]: # 'NOTE: This file is generated and should not be modify directly. Update `templates/ROOT_README.hbs.md` instead'

# Things Scene

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.org/things-scene/things-scene.svg?branch=master)](https://travis-ci.org/things-scene/things-scene)
[![codecov](https://codecov.io/gh/things-scene/things-scene/branch/master/graph/badge.svg)](https://codecov.io/gh/things-scene/things-scene)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Micro Modules for ThingsScene.

These modules compose together to help you create performant modern JS apps that you love to develop and test. These packages are developed primarily to be used on top of the stack we like best for our JS apps; Typescript for the flavor, Koa for the server, LitElement for UI, Apollo for data fetching, and Jest for tests. That said, you can mix and match as you like.

## Usage

The things-scene repo is managed as a monorepo that is composed of 17 npm packages.
Each package has its own `README.md` and documentation describing usage.

```
# generate new module (ie. @things-scene/random)
$ yarn generate app
  ? What should this module's name be? Ex. random > # type "random"

# generate new component in a module (ie. "button" component in @things-scene/switch module)
$ yarn generate component
  ? What is target package's name? Ex. switch > # type "switch"
  ? What should this component's name be? Ex. button > # type "button"

# generate new container component in a module (ie. "button" container component in @things-scene/switch module)
$ yarn generate container
  ? What is target package's name? Ex. switch > # type "switch"
  ? What should this component's name be? Ex. button > # type "button"

# generate new html-component in a module (ie. "button" html-component in @things-scene/switch module)
$ yarn generate html-component
  ? What is target package's name? Ex. switch > # type "switch"
  ? What should this component's name be? Ex. button > # type "button"

# generate new data-source component in a module (ie. "button" component in @things-scene/switch module)
$ yarn generate data-source
  ? What is target package's name? Ex. switch > # type "switch"
  ? What should this component's name be? Ex. button > # type "button"

# generate new data-transform component in a module (ie. "button" component in @things-scene/switch module)
$ yarn generate data-transform
  ? What is target package's name? Ex. switch > # type "switch"
  ? What should this component's name be? Ex. button > # type "button"
```


### Package Index

| Package | Version | Description |
| ------- | ------- | ----------- |
| [chartjs](packages/chartjs) | <a href="https://badge.fury.io/js/%40things-scene%2Fchartjs"><img src="https://badge.fury.io/js/%40things-scene%2Fchartjs.svg" width="200px" /></a> | Things Scene ChartJS Component |
| [clone](packages/clone) | <a href="https://badge.fury.io/js/%40things-scene%2Fclone"><img src="https://badge.fury.io/js/%40things-scene%2Fclone.svg" width="200px" /></a> | An element providing a starting point for your own reusable Polymer elements. |
| [compass](packages/compass) | <a href="https://badge.fury.io/js/%40things-scene%2Fcompass"><img src="https://badge.fury.io/js/%40things-scene%2Fcompass.svg" width="200px" /></a> | Compass Component for things-scene. |
| [data-transform](packages/data-transform) | <a href="https://badge.fury.io/js/%40things-scene%2Fdata-transform"><img src="https://badge.fury.io/js/%40things-scene%2Fdata-transform.svg" width="200px" /></a> | data-transform component for things-scene |
| [firebase](packages/firebase) | <a href="https://badge.fury.io/js/%40things-scene%2Ffirebase"><img src="https://badge.fury.io/js/%40things-scene%2Ffirebase.svg" width="200px" /></a> | Firebase datasource component for things-scene. |
| [form](packages/form) | <a href="https://badge.fury.io/js/%40things-scene%2Fform"><img src="https://badge.fury.io/js/%40things-scene%2Fform.svg" width="200px" /></a> | The HTML Element component for things-scene. |
| [graphql](packages/graphql) | <a href="https://badge.fury.io/js/%40things-scene%2Fgraphql"><img src="https://badge.fury.io/js/%40things-scene%2Fgraphql.svg" width="200px" /></a> | graphql component for things-scene |
| [grist](packages/grist) | <a href="https://badge.fury.io/js/%40things-scene%2Fgrist"><img src="https://badge.fury.io/js/%40things-scene%2Fgrist.svg" width="200px" /></a> | grist component for things-scene |
| [integration](packages/integration) | <a href="https://badge.fury.io/js/%40things-scene%2Fintegration"><img src="https://badge.fury.io/js/%40things-scene%2Fintegration.svg" width="200px" /></a> | integration component for things-scene |
| [label](packages/label) | <a href="https://badge.fury.io/js/%40things-scene%2Flabel"><img src="https://badge.fury.io/js/%40things-scene%2Flabel.svg" width="200px" /></a> | label component for things-scene |
| [marker](packages/marker) | <a href="https://badge.fury.io/js/%40things-scene%2Fmarker"><img src="https://badge.fury.io/js/%40things-scene%2Fmarker.svg" width="200px" /></a> | An element providing a starting point for your own reusable Polymer elements. |
| [random](packages/random) | <a href="https://badge.fury.io/js/%40things-scene%2Frandom"><img src="https://badge.fury.io/js/%40things-scene%2Frandom.svg" width="200px" /></a> | An random component for things-scene. |
| [restful](packages/restful) | <a href="https://badge.fury.io/js/%40things-scene%2Frestful"><img src="https://badge.fury.io/js/%40things-scene%2Frestful.svg" width="200px" /></a> | Restful Client Component for Things Scene |
| [switch](packages/switch) | <a href="https://badge.fury.io/js/%40things-scene%2Fswitch"><img src="https://badge.fury.io/js/%40things-scene%2Fswitch.svg" width="200px" /></a> | switch component for things-scene |
| [table](packages/table) | <a href="https://badge.fury.io/js/%40things-scene%2Ftable"><img src="https://badge.fury.io/js/%40things-scene%2Ftable.svg" width="200px" /></a> | Things Scene Table Component. |
| [timer](packages/timer) | <a href="https://badge.fury.io/js/%40things-scene%2Ftimer"><img src="https://badge.fury.io/js/%40things-scene%2Ftimer.svg" width="200px" /></a> | timer component for things-scene |
| [visualizer](packages/visualizer) | <a href="https://badge.fury.io/js/%40things-scene%2Fvisualizer"><img src="https://badge.fury.io/js/%40things-scene%2Fvisualizer.svg" width="200px" /></a> | The visualizer component for things-scene. |

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## License

MIT &copy; [Hatiolab](https://www.hatiolab.com/), see [LICENSE](LICENSE.md) for details.

<a href="http://www.hatiolab.com/"><img src="https://www.hatiolab.com/assets/img/logo.png" alt="Hatiolab" width="200" /></a>
