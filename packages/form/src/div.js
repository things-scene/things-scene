/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true
}

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'

export default class Div extends HTMLOverlayContainer {
  setElementProperties(div) {
    div.textContent = this.text
  }

  get tagName() {
    return 'div'
  }

  get nature() {
    return NATURE
  }
}

Component.register('div', Div)
