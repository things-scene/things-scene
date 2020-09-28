const { readdirSync, existsSync } = require('fs')
const path = require('path')
const { camelCase, startCase } = require('lodash')

const jsPackages = getPackages('js')
const timestamp = Date.now()

module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Create a new module from scratch',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What should this module's name be? Ex. menu",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'description',
        message: "What should this module's description be?",
        filter: stripDescription
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'templates/module',
        templateFiles: 'templates/module/**/*',
        force: false
      }
    ]
  })

  plop.setGenerator('component', {
    description: 'Generate component from scratch',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'name',
        message: "What should this components's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.js',
        templateFile: 'templates/component/component.js.hbs',
        force: false
      },
      {
        type: 'modify',
        path: 'packages/{{packageName}}/src/index.js',
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, '')
          return file.replace(/^/, `export { default as ${pascalCaseName} } from './${name}'\n`)
        }
      }
    ]
  })

  plop.setGenerator('html-component', {
    description: 'Generate component from scratch',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'name',
        message: "What should this components's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.js',
        templateFile: 'templates/html-component/component.js.hbs',
        force: false
      },
      {
        type: 'modify',
        path: 'packages/{{packageName}}/src/index.js',
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, '')
          return file.replace(/^/, `export { default as ${pascalCaseName} } from './${name}'\n`)
        }
      }
    ]
  })

  plop.setGenerator('data-source', {
    description: 'Generate component from scratch',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'name',
        message: "What should this components's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.js',
        templateFile: 'templates/data-source/component.js.hbs',
        force: false
      },
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.png',
        templateFile: 'templates/data-source/component.png',
        force: false
      },
      {
        type: 'modify',
        path: 'packages/{{packageName}}/src/index.js',
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, '')
          return file.replace(/^/, `export { default as ${pascalCaseName} } from './${name}'\n`)
        }
      }
    ]
  })

  plop.setGenerator('data-transform', {
    description: 'Generate component from scratch',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'name',
        message: "What should this components's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.js',
        templateFile: 'templates/data-transform/component.js.hbs',
        force: false
      },
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.png',
        templateFile: 'templates/data-transform/component.png',
        force: false
      },
      {
        type: 'modify',
        path: 'packages/{{packageName}}/src/index.js',
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, '')
          return file.replace(/^/, `export { default as ${pascalCaseName} } from './${name}'\n`)
        }
      }
    ]
  })

  plop.setGenerator('container', {
    description: 'Generate container component from scratch',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      },
      {
        type: 'input',
        name: 'name',
        message: "What should this container components's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper('kebabCase')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{packageName}}/src/{{name}}.js',
        templateFile: 'templates/container/component.js.hbs',
        force: false
      },
      {
        type: 'modify',
        path: 'packages/{{packageName}}/src/index.js',
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, '')
          return file.replace(/^/, `export { default as ${pascalCaseName} } from './${name}'\n`)
        }
      }
    ]
  })

  plop.setGenerator('docs', {
    description: 'Generate root repo documentation',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: 'README.md',
        templateFile: 'templates/docs/ROOT_README.hbs.md',
        force: true,
        data: { jsPackages }
      }
    ]
  })
}

function getPackages(type = 'js') {
  const packagesPath = path.join(__dirname, type === 'js' ? 'packages' : 'gems')

  return readdirSync(packagesPath).reduce((acc, packageName) => {
    const packageJSONPath = path.join(packagesPath, packageName, 'package.json')

    if (existsSync(packageJSONPath)) {
      const { name, description } = require(packageJSONPath)

      acc.push({ name: name.replace('@things-scene/', ''), description })
    }

    return acc
  }, [])
}

function validatePackageName(name) {
  return (
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/g.test(`@things-scene/${name}`) ||
    `Your package name (@things-scene/${name}) does not confirm to npm rules!`
  )
}

function stripDescription(desc) {
  return desc.replace(/[.\s]*$/g, '').replace(/^\s*/g, '')
}
