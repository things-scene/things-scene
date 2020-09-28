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
    },
    {
      type: 'checkbox',
      label: 'multiple',
      name: 'multiple'
    }
  ],
  'value-property': 'text'
}

import { Component } from '@hatiolab/things-scene'
import Input from './input'

export default class InputFile extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element) {
    super.setElementProperties(element)

    element.multiple = !!this.state.multiple
  }
}

Component.register('input-file', InputFile)
