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
      label: 'href',
      name: 'href',
      property: 'href'
    },
    {
      type: 'select',
      label: 'target',
      name: 'target',
      property: {
        options: [
          {
            display: 'self',
            value: '_self'
          },
          {
            display: 'blank',
            value: '_blank'
          },
          {
            display: 'parent',
            value: '_parent'
          },
          {
            display: 'top',
            value: '_top'
          }
        ]
      }
    }
  ],
  'value-property': 'href'
}

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'

export default class Link extends HTMLOverlayContainer {
  get tagName() {
    return 'a'
  }

  get href() {
    return this.get('href')
  }

  set href(href) {
    this.set('href', href)
  }

  setElementProperties(link) {
    var { href = '', target } = this.state

    if (link.href != href) link.href = href

    link.target = target

    if (this.components.length == 0) this.element.textContent = this.text || href
  }

  get nature() {
    return NATURE
  }
}

Component.register('link', Link)
