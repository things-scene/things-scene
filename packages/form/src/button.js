/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'value',
      name: 'text'
    }
  ],
  'value-property': 'text'
}

export default class Button extends HTMLOverlayElement {
  get tagName() {
    return 'button'
  }

  get nature() {
    return NATURE
  }

  setElementProperties(button) {
    this.element.textContent = this.value
  }
}

Component.register('button', Button)
