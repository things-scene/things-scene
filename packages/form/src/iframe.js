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
      label: 'src',
      name: 'src'
    }
  ],
  'value-property': 'src'
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'

export default class IFrame extends HTMLOverlayElement {
  get src() {
    return this.getState('src')
  }

  set src(src) {
    this.setState('src', src)
  }

  setElementProperties(iframe) {
    var { src = '' } = this.state

    if (iframe.src != src) iframe.src = src
  }

  get nature() {
    return NATURE
  }
}

Component.register('iframe', IFrame)
