/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Rect } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'color',
      label: 'inner-circle-fill-style',
      name: 'innerCircleFillStyle',
      property: 'innerCircleFillStyle'
    }
  ]
}

export default class Marker extends Rect {
  is3dish() {
    return false
  }

  _draw(context) {
    var { innerCircleFillStyle } = this.model
    var { top, left, width, height } = this.bounds
    context.translate(left, top)

    // 마커 모양 그리기
    context.beginPath()

    context.moveTo(width / 2, height * 0.9)

    context.bezierCurveTo(width / 2.3, height * 0.6, 0, height / 2, 0, height / 4)

    context.ellipse(
      width / 2,
      height / 4,
      Math.abs(width / 2),
      Math.abs(height / 4),
      0,
      Math.PI * (width < 0 ? 0 : 1),
      Math.PI * (width < 0 ? 1 : 0),
      Math.sign(width) * Math.sign(height) == -1
    )

    context.bezierCurveTo(width, height / 2, width / 1.7, height * 0.6, width / 2, height * 0.9)

    context.closePath()

    this.drawFill(context)
    this.drawStroke(context)

    // 안쪽 원 그리기
    context.beginPath()
    context.ellipse(width / 2, height / 4, Math.abs(width * 0.18), Math.abs(height * 0.09), 0, 0, Math.PI * 2)
    context.fillStyle = innerCircleFillStyle
    context.fill()

    context.translate(-left, -top)
  }
  get controls() {}

  _post_draw(context) {
    this.drawText(context)
  }

  get nature() {
    return NATURE
  }
}

Component.register('marker', Marker)
