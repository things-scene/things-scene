/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    {
      type: 'checkbox',
      label: 'copy-value-to-data',
      name: 'copyValueToData'
    }
  ],
  'value-property': 'value'
}

import { Component, HTMLOverlayContainer, warn } from '@hatiolab/things-scene'
export default class RadioGroup extends HTMLOverlayContainer {
  get nature() {
    return NATURE
  }

  containable(component) {
    return component.model.type == 'input-radio'
  }

  setElementProperties(element) {
    element.onchange = () => {
      this.changeChecked()
    }
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
      if (this.get('submitOnChange') && this.element.parentElement.tagName == 'FORM')
        this.element.parentElement.dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }
  }

  changeChecked() {
    var allRadioList = this.element.querySelectorAll('input')
    var specificList = Array.prototype.slice.call(allRadioList).filter(e => e.name == this.element.id)
    if (specificList.length) {
      var checkedValue = specificList.filter(e => e.checked == true)
      this.set('value', checkedValue[0].value)
    }
  }
}

Component.register('radio-group', RadioGroup)
