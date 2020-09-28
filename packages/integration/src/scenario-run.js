/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import COMPONENT_IMAGE from '../assets/symbol-integration.png'
import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'
import gql from 'graphql-tag'
import { createLocalClient } from './local-client'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'instance-name',
      name: 'instanceName'
    },
    {
      type: 'string',
      label: 'scenario-name',
      name: 'scenarioName'
    },
    {
      type: 'string',
      label: 'variables',
      name: 'variables'
    },
    {
      type: 'checkbox',
      label: 'run-on-start',
      name: 'runOnStart'
    }
  ],
  'value-property': 'variables'
}

export default class ScenarioRun extends DataSource(RectPath(Shape)) {
  static get image() {
    if (!ScenarioRun._image) {
      ScenarioRun._image = new Image()
      ScenarioRun._image.src = COMPONENT_IMAGE
    }
    return ScenarioRun._image
  }

  render(context) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    context.drawImage(ScenarioRun.image, left, top, width, height)
  }

  ready() {
    super.ready()
    this._initScenario()
  }

  _initScenario() {
    if (!this.app.isViewMode) {
      return
    }
    this._client = createLocalClient()
    if (this.state.runOnStart) {
      this.requestData()
    }
  }

  dispose() {
    super.dispose()

    try {
      if (this._client) {
        this._client.stop()
      }
    } catch (e) {
      console.error(e)
    }
    delete this._client
  }

  get nature() {
    return NATURE
  }

  onchange(after) {
    if ('variables' in after) {
      this.requestData()
    }
  }

  get variables() {
    return this.state.variables
  }

  set variables(variables) {
    this.setState('variables', variables)
  }

  get client() {
    return this._client
  }

  async requestData() {
    let { instanceName, scenarioName, variables } = this.state
    if (!scenarioName || !this.app.isViewMode) return

    var client = this._client
    try {
      variables = typeof variables == 'string' ? JSON.parse(variables) : variables
    } catch (e) {
      console.error(e)
    }

    if (client) {
      var response = await client.query({
        query: gql`
          mutation($instanceName: String, $scenarioName: String!, $variables: Object) {
            runScenario(instanceName: $instanceName, scenarioName: $scenarioName, variables: $variables) {
              state
              message
              data
            }
          }
        `,
        variables: {
          instanceName: instanceName,
          scenarioName: scenarioName,
          variables
        }
      })

      this.data = response?.data?.runScenario?.data
    }
  }
}

Component.register('scenario-run', ScenarioRun)
