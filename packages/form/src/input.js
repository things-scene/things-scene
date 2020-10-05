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
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    {
      type: 'checkbox',
      label: 'spread-on-init',
      name: 'spreadOnInit'
    }
  ],
  'value-property': 'text'
}

import { Component, HTMLOverlayElement, error } from '@hatiolab/things-scene'

export default class Input extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return this.get('type').substr(6)
  }

  createElement() {
    super.createElement()

    /* element.property => component.property */
    this.element.onchange = e => {
      this.value = this.element.value
      // this.data = this.value
    }
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var { name = '', placeholder = '', disabled, readonly, maxlength, spreadOnInit } = this.state

    try {
      element.type = this.inputType
      element.name = name
      element.placeholder = placeholder
      element.disabled = disabled
      element.readonly = readonly
      element.maxlength = maxlength
      element.value = this.value
    } catch (e) {
      error(e)
    }

    if (spreadOnInit) {
      this.data = this.value
    }
  }

  onchange(after, before) {
    super.onchange(after, before)
    var { spreadOnInit, submitOnChange } = this.state

    var valueProperty = this.nature['value-property']
    if (valueProperty && valueProperty in after && this.element) {
      this.element.value = after.text
      if (!spreadOnInit) {
        this.data = this.value
      }

      if (submitOnChange && this.element.form)
        this.element.form.dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }
  }
}

;[
  'input',
  'input-text',
  'input-password',
  'input-email',
  'input-search',
  'input-time',
  'input-datetime-local',
  'input-month',
  'input-week'
].forEach(input => Component.register(input, Input))
