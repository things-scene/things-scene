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
      type: 'string',
      label: 'placeholder',
      name: 'placeholder'
    },
    {
      type: 'checkbox',
      label: 'readonly',
      name: 'readonly'
    },
    {
      type: 'checkbox',
      label: 'disabled',
      name: 'disabled'
    },
    {
      type: 'number',
      label: 'max-length',
      name: 'maxlength'
    }
  ],
  'value-property': 'text'
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'

export default class TextArea extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'textarea'
  }

  createElement() {
    super.createElement()

    this.element.style.resize = 'none'

    /* element.property => component.property */
    this.element.onchange = e => {
      this.value = this.element.value
    }
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var { name = '', placeholder = '', disabled, readonly, maxlength } = this.state

    try {
      element.name = name
      element.placeholder = placeholder
      element.disabled = disabled
      element.readonly = readonly
      element.maxlength = maxlength
      element.value = this.value
    } catch (e) {
      error(e)
    }

    this.data = this.value
  }
}

Component.register('textarea', TextArea)
