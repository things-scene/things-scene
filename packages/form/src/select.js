/*
 * Copyright � HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'value',
      name: 'value'
    },
    {
      type: 'number',
      label: 'size',
      name: 'size'
    },
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    {
      type: 'checkbox',
      label: 'copy-value-to-data',
      name: 'copyValueToData'
    },
    {
      type: 'string',
      label: 'text-field',
      name: 'textField'
    },
    {
      type: 'string',
      label: 'value-field',
      name: 'valueField'
    },
    {
      type: 'options',
      label: 'options',
      name: 'options'
    }
  ],
  'value-property': 'value'
}

import { Component, HTMLOverlayElement, warn } from '@hatiolab/things-scene'

export default class Select extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  buildOptions() {
    var { options = [], textField, valueField, value } = this.state

    if (!(options instanceof Array)) options = []

    this.element.textContent = ''
    var defaultValue

    options.map &&
      options
        .map((option, index) => {
          let text, value

          if (!textField) {
            text = option && (option['text'] || option)
          } else if (textField == '(index)') {
            text = index
          } else {
            // String.fromCharCode(160) == '&nbsp'
            text = (option && option[textField]) || String.fromCharCode(160)
          }

          if (!valueField) {
            value = option && (option['value'] || option)
          } else if (valueField == '(index)') {
            value = index
          } else {
            value = option && option[valueField]
          }

          if (defaultValue === undefined) {
            defaultValue = value
          }

          if (value == this.value) {
            defaultValue = this.value
          }

          return { text, value }
        })
        .forEach(option => {
          var el = document.createElement('option')
          el.value = typeof option.value == 'string' ? option.value : JSON.stringify(option.value)
          el.text = option.text
          this.element.appendChild(el)
        })

    if (defaultValue !== undefined && this.value !== defaultValue) {
      this.value = JSON.stringify(defaultValue)
    }

    if (this.element.value != this.value) {
      this.element.value = this.value
      this.element.dispatchEvent(new Event('change'))
    }
  }

  createElement() {
    super.createElement()

    this.buildOptions()

    var element = this.element

    element.value = this.get('value') || ''

    element.onchange = e => {
      this.set('value', element.value)
    }
  }

  setElementProperties(element) {
    var { size, name } = this.state

    element.size = size
    element.name = name
  }

  onchange(after, before) {
    super.onchange(after, before)

    if ('value' in after && this.element) {
      this.element.value = after.value
      if (this.get('copyValueToData')) {
        try {
          this.data = JSON.parse(after.value)
        } catch (e) {
          this.data = after.value
        }
      }

      if (this.get('submitOnChange') && this.element.form)
        this.element.form.dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }

    if ('options' in after) this.buildOptions()
  }

  get options() {
    return this.getState('options')
  }

  set options(options) {
    this.setState('options', options)
  }
}

Component.register('select', Select)
