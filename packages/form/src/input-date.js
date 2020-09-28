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
      type: 'date',
      label: 'value',
      name: 'text'
    },
    {
      type: 'date',
      label: 'min',
      name: 'min'
    },
    {
      type: 'date',
      label: 'max',
      name: 'max'
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    }
  ],
  'value-property': 'text'
}

import { Component } from '@hatiolab/things-scene'
import Input from './input'

export default class InputDate extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element) {
    super.setElementProperties(element)

    var { min, max } = this.state

    element.min = min
    element.max = max
  }
}

Component.register('input-date', InputDate)
