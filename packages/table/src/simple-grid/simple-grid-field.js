/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, RectPath } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'editor-table',
      label: '',
      name: '',
      property: {
        merge: false,
        split: false
      }
    },
    {
      type: 'string',
      label: 'data-key',
      name: 'dataKey',
      property: 'dataKey'
    }
  ]
}

/**
 * 이 컴포넌트는 SimpleGrid의 각 셀의 템플릿(필드) 정보를 가지고 있는 컴포넌트이다.
 */
export default class SimpleGridField extends RectPath(Component) {
  get nature() {
    return NATURE
  }

  _drawBorder(context, x, y, to_x, to_y, style) {
    if (style && style.strokeStyle && style.lineWidth && style.lineDash) {
      context.beginPath()
      context.moveTo(x, y)
      context.lineTo(to_x, to_y)
      Component.drawStroke(context, style)
    }
  }

  _draw(context) {
    // if (this.app.isViewMode) {
    //   return
    // }

    var { left, top, width, height } = this.bounds

    var border = this.model.border || {}

    // Cell 채우기.
    context.beginPath()
    context.lineWidth = 0
    context.rect(left, top, width, height)
    this.drawFill(context)

    // Border 그리기
    var parent = this.parent
    var idx = parent.components.indexOf(this)
    var columns = parent.columns || 1

    this._drawBorder(context, left, top, left + width, top, border.top)
    this._drawBorder(context, left, top + height, left, top, border.left)
    if ((idx + 1) % columns == 0) {
      /* if this filed is right most, draw right side border. */
      this._drawBorder(context, left + width, top, left + width, top + height, border.right)
    }
    this._drawBorder(context, left + width, top + height, left, top + height, border.bottom)
  }
}

Component.register('simple-grid-field', SimpleGridField)
