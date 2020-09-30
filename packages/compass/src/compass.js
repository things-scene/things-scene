/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Ellipse } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'value',
      name: 'value',
      property: 'value'
    }
  ]
}

export default class Compass extends Ellipse {
  is3dish() {
    return false
  }

  _draw(context) {
    var { value = 0, fillStyle, cx, cy, rx, ry } = this.model

    context.translate(cx, cy)

    ////  메인 원 그리기  ////
    context.beginPath()
    context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI)
    context.ellipse(0, 0, Math.abs(rx * 0.75), Math.abs(ry * 0.75), 0, 2 * Math.PI, 0, true) // 반대로 그리며 원을 지움.

    this.drawStroke(context)
    this.drawFill(context)
    context.closePath()

    ////  무늬 그리기  ////
    context.beginPath()
    context.moveTo(rx * 0.65, 0)
    context.lineTo(0, ry * 0.09)
    context.lineTo(-rx * 0.65, 0)
    context.lineTo(0, -ry * 0.09)

    context.moveTo(0, ry * 0.65)
    context.lineTo(rx * 0.09, 0)
    context.lineTo(0, -ry * 0.65)
    context.lineTo(-rx * 0.09, 0)

    context.fillStyle = fillStyle
    context.fill()
    context.closePath()

    ////  텍스트 그리기  ////
    context.beginPath()
    context.fillStyle = 'black'
    context.font = (rx + ry) / 13 + 'px arial'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText('N', 0, -ry + ry * 0.125)
    context.fillText('S', 0, ry - ry * 0.125)
    context.fillText('W', -rx + rx * 0.125, 0)
    context.fillText('E', rx - rx * 0.125, 0)

    ////  바늘 그리기  ////
    context.beginPath()
    var ang = ((value + (this._anim_alpha || 0)) / 50) * Math.PI
    context.rotate(ang)

    context.moveTo(0, -ry * 0.65)
    context.lineTo(rx * 0.13, 0)
    context.lineTo(-rx * 0.13, 0)
    context.fillStyle = '#F53B3B'
    context.fill()

    context.beginPath()
    context.moveTo(0, ry * 0.65)
    context.lineTo(rx * 0.13, 0)
    context.lineTo(-rx * 0.13, 0)
    context.fillStyle = '#3DC0E8'
    context.fill()

    context.rotate(-ang)

    ////  중앙 원 그리기  ////
    context.beginPath()
    context.ellipse(0, 0, Math.abs(rx * 0.15), Math.abs(ry * 0.15), 0, 0, 2 * Math.PI)
    context.lineWidth = (rx + ry) * 0.013
    context.strokeStyle = '#FFFFFF'
    context.fillStyle = '#3DC0E8'
    context.fill()
    context.stroke()
    context.beginPath()

    context.ellipse(0, 0, Math.abs(rx * 0.06), Math.abs(ry * 0.06), 0, 0, 2 * Math.PI)
    context.fillStyle = '#FFFFFF'
    context.fill()
    context.closePath()

    context.translate(-cx, -cy)
  }

  _post_draw(context) {
    this.drawText(context)
  }

  onchange(after, before) {
    if (!after.hasOwnProperty('value')) return

    var self = this
    var diff = after.value - before.value

    this._anim_alpha = -diff

    this.animate({
      step: function(delta) {
        self._anim_alpha = diff * (delta - 1)
        self.invalidate()
      },
      duration: 1000,
      delta: 'elastic',
      options: {
        x: 2
      },
      ease: 'out'
    }).start()
  }

  get nature() {
    return NATURE
  }
}

Component.register('compass', Compass)
