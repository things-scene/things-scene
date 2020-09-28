/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'string',
      label: 'value',
      name: 'text'
    }
  ],
  'value-property': 'text'
}

import { Component } from '@hatiolab/things-scene'
import Input from './input'

export default class InputSubmit extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element) {
    super.setElementProperties(element)
  }
}

Component.register('input-button', InputSubmit)
Component.register('input-submit', InputSubmit)
Component.register('input-reset', InputSubmit)
