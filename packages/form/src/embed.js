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
      name: 'src',
    },
    {
      type: 'string',
      label: 'mime-type',
      name: 'mimetype',
    },
  ],
  'value-property': 'src',
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'

export default class Embed extends HTMLOverlayElement {
  get src() {
    return this.getState('src')
  }

  set src(src) {
    this.setState('src', src)
  }

  setElementProperties(embed) {
    var { src = '', mimetype = '' } = this.state

    if (embed.src != src) embed.src = src
    if (embed.type != mimetype) embed.type = mimetype
  }

  get nature() {
    return NATURE
  }
}

Component.register('embed', Embed)
