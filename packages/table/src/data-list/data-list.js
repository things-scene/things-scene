/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Container, Layout, Model } from '@hatiolab/things-scene'

import './data-cell'
import './data-list-layout'

import {
  CLEAR_STYLE,
  buildNewCell,
  buildCopiedCell,
  setCellBorder,
  isLeftMost,
  isRightMost,
  isTopMost,
  isBottomMost,
  above,
  below,
  before,
  after,
  array,
  columnControlHandler,
  rowControlHandler
} from '../helper-functions'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'columns',
      name: 'columns',
      property: 'columns'
    }
  ],
  'value-property': 'data'
}

export default class DataList extends Container {
  postrender(context) {
    // 컨테이너의 범위 내에서만 그린다.
    // container의 기본 기능으로 추가되면 좋겠다.
    context.clip()

    super.postrender(context)

    // child component들을 다 그린 후에 scrollbar를 표현한다.
    if (this.app.isViewMode) {
      this.renderScrollbar(context)
    }
  }

  renderScrollbar(context) {
    var { left, top, width, height } = this.bounds
    var { offset = { x: 0, y: 0 }, data } = this.state

    var fullHeight = ((data && data.length) || 0) * (this.heights[0] / this.heights_sum) * height

    if (fullHeight <= height) {
      return
    }

    var start = (-offset.y / fullHeight) * height
    var end = ((-offset.y + height) / fullHeight) * height

    context.strokeStyle = 'gray'
    context.lineWidth = 10
    context.globalAlpha = 0.3

    context.beginPath()
    context.moveTo(left + width - 10, top + start)
    context.lineTo(left + width - 10, top + end)

    context.stroke()
  }

  created() {
    this.set('rows', 2)

    var rows = 1

    var tobeSize = rows * this.columns
    var gap = this.size() - tobeSize

    if (this.data) {
      this.setCellsData()
    }

    if (gap == 0) {
      return
    } else if (gap > 0) {
      let removals = this._components.slice(gap)
      this.remove(removals)
    } else {
      let newbies = []

      for (let i = 0; i < -gap; i++) newbies.push(buildNewCell('data-cell', this.app))

      this.add(newbies)
    }

    var widths = this.get('widths')
    var heights = this.get('heights')

    if (!widths || widths.length < this.columns) this.set('widths', this.widths)
    if (!heights || heights.length < rows) this.set('heights', this.heights)
  }

  _onwheel(e) {
    e.stopPropagation()

    var { height } = this.bounds
    var { offset = { x: 0, y: 0 } } = this.state

    var recordHeight = (this.heights[0] / this.heights.reduce((sum, height) => sum + height)) * height

    var minX = 0
    var minY = this.data && this.data.length ? Math.min(-recordHeight * this.data.length + height, 0) : 0

    /* shiftKey + wheel 은 deltaX 값을 변화시킨다. */
    if (e.deltaY == 0 && e.deltaX == 0) return

    var x = e.deltaX + offset.x
    var y = -e.deltaY + offset.y

    /* 휠을 밀면.. 화면은 위쪽으로 : scroll down */
    /* 휠을 당기면.. 화면은 아래쪽으로 : scroll up */

    this.setState({
      offset: {
        x: Math.max(Math.min(0, x), minX),
        y: Math.max(Math.min(0, y), minY)
      }
    })
  }

  _ontouchstart(e) {
    this.__START_OFFSET = this.state.offset || {
      x: 0,
      y: 0
    }
    this.__START_Y = e.offsetY
  }

  _ontouchmove(e) {
    if (!this.__START_OFFSET) {
      return
    }

    var { height } = this.bounds

    var recordHeight = (this.heights[0] / this.heights.reduce((sum, height) => sum + height)) * height
    var minY = this.data && this.data.length ? Math.min(-recordHeight * this.data.length + height, 0) : 0

    var x = 0
    var y = this.__START_OFFSET.y + (e.offsetY - this.__START_Y) / this.rootModel.state.scale.y
    y = Math.max(Math.min(0, y), minY)

    var offset = this.state.offset || { x: 0, y: 0 }
    if (offset.x !== x || offset.y !== y) {
      this.setState('offset', {
        x,
        y
      })

      e.stopPropagation()
    }
  }

  _ontouchend(e) {
    delete this.__START_OFFSET
    delete this.__START_Y
  }

  get layout() {
    return Layout.get('data-list')
  }

  containable(component) {
    return component.get('type') == 'data-cell'
  }

  get focusible() {
    /* 이 컨테이너에는 컴포넌트를 임의로 추가 및 삭제할 수 없도록 함 */
    return false
  }

  get widths_sum() {
    var widths = this.widths
    return widths ? widths.filter((width, i) => i < this.columns).reduce((sum, width) => sum + width, 0) : this.columns
  }

  get heights_sum() {
    var heights = this.heights
    return heights ? heights.filter((height, i) => i < this.rows).reduce((sum, height) => sum + height, 0) : this.rows
  }

  get widths() {
    var widths = this.get('widths')

    if (!widths) return array(1, this.columns)

    if (widths.length < this.columns) return widths.concat(array(1, this.columns - widths.length))
    else if (widths.length > this.columns) return widths.slice(0, this.columns)

    return widths
  }

  get heights() {
    var heights = this.get('heights')
    var rows = 2

    if (!heights) {
      return array(1, rows)
    }

    if (heights.length < rows) return heights.concat(array(1, rows - heights.length))
    else if (heights.length > rows) return heights.slice(0, rows)

    return heights
  }

  get columns() {
    return Number(this.get('columns'))
  }

  get rows() {
    /* 1 for first record fields, 1 for rest record fields */
    return 2
  }

  get nature() {
    return NATURE
  }

  get controls() {
    var widths = this.widths
    var heights = this.heights
    var inside = this.textBounds

    var width_unit = inside.width / this.widths_sum
    var height_unit = inside.height / this.heights_sum

    var x = inside.left
    var y = inside.top

    var controls = []

    widths.slice(0, this.columns - 1).forEach(width => {
      x += width * width_unit
      controls.push({
        x: x,
        y: inside.top,
        handler: columnControlHandler
      })
    })

    heights.slice(0, this.rows - 1).forEach(height => {
      y += height * height_unit
      controls.push({
        x: inside.left,
        y: y,
        handler: rowControlHandler
      })
    })

    return controls
  }

  onchange(after, before) {
    if ('data' in after) {
      this.setCellsData()
    }

    if ('columns' in after) {
      let { columns } = this

      this.buildCells(columns, Number(before.columns))
    }
  }

  get eventMap() {
    return {
      '(self)': {
        '(all)': {
          wheel: this._onwheel,
          touchstart: this._ontouchstart,
          touchmove: this._ontouchmove,
          touchend: this._ontouchend
        }
      }
    }
  }

  setCellsData() {
    if (!this.app.isViewMode) {
      return
    }

    var data = this.data || []
    if (!(data instanceof Array)) {
      data = [data]
    }

    /* 기존의 레코드를 모두 삭제 (템플릿 레코드만 남긴다.) */
    this.remove(this.components.slice(this.columns))

    /* template 레코드의 데이타를 클리어시킨다 */
    var templates = this.getCellsByRow(0)
    templates.forEach(field => {
      field.data = ''
    })

    /* 데이타의 크기만큼 새로운 레코드를 만든다 */
    if (data.length > 1) {
      let newbies = []

      for (let i = 1; i < data.length; i++) {
        newbies = newbies.concat(
          templates.map(field => {
            return Model.compile(
              {
                ...field.model,
                id: '',
                data: ''
              },
              this.app
            )
          })
        )
      }

      this.add(newbies)
    }

    data.forEach((record, idx) => {
      let data = {
        _idx: idx,
        ...record
      }
      let row = this.getCellsByRow(idx)
      row.forEach(field => {
        field.data = data
      })
    })
  }

  setCellsStyle(cells, style, where) {
    var components = this.components
    var total = components.length
    var columns = this.get('columns')

    var indices = cells.map(cell => components.indexOf(cell))
    indices.forEach(i => {
      var cell = components[i]

      switch (where) {
        case 'all':
          setCellBorder(cell, style, where)

          if (isLeftMost(total, columns, indices, i)) setCellBorder(components[before(columns, i)], style, 'right')
          if (isRightMost(total, columns, indices, i)) setCellBorder(components[after(columns, i)], style, 'left')
          if (isTopMost(total, columns, indices, i)) setCellBorder(components[above(columns, i)], style, 'bottom')
          if (isBottomMost(total, columns, indices, i)) setCellBorder(components[below(columns, i)], style, 'top')
          break
        case 'in':
          if (!isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
          }
          if (!isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
          }
          if (!isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
          }
          if (!isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
          }
          break
        case 'out':
          if (isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
            setCellBorder(components[before(columns, i)], style, 'right')
          }
          if (isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
            setCellBorder(components[after(columns, i)], style, 'left')
          }
          if (isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
            setCellBorder(components[above(columns, i)], style, 'bottom')
          }
          if (isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
            setCellBorder(components[below(columns, i)], style, 'top')
          }
          break
        case 'left':
          if (isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
            setCellBorder(components[before(columns, i)], style, 'right')
          }
          break
        case 'right':
          if (isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
            setCellBorder(components[after(columns, i)], style, 'left')
          }
          break
        case 'center':
          if (!isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
          }
          if (!isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
          }
          break
        case 'middle':
          if (!isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
          }
          if (!isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
          }
          break
        case 'top':
          if (isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
            setCellBorder(components[above(columns, i)], style, 'bottom')
          }
          break
        case 'bottom':
          if (isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
            setCellBorder(components[below(columns, i)], style, 'top')
          }
          break
        case 'clear':
          setCellBorder(cell, CLEAR_STYLE, 'all')

          if (isLeftMost(total, columns, indices, i))
            setCellBorder(components[before(columns, i)], CLEAR_STYLE, 'right')
          if (isRightMost(total, columns, indices, i)) setCellBorder(components[after(columns, i)], CLEAR_STYLE, 'left')
          if (isTopMost(total, columns, indices, i)) setCellBorder(components[above(columns, i)], CLEAR_STYLE, 'bottom')
          if (isBottomMost(total, columns, indices, i)) setCellBorder(components[below(columns, i)], CLEAR_STYLE, 'top')
      }
    })
  }

  buildCells(newcolumns, oldcolumns) {
    var minrows = 1

    if (newcolumns > oldcolumns) {
      for (let r = 0; r < minrows; r++) {
        for (let c = oldcolumns; c < newcolumns; c++) {
          this.insertComponentAt(buildNewCell('data-cell', this.app), r * newcolumns + c)
        }
      }
    } else if (newcolumns < oldcolumns) {
      let removals = []

      for (let r = 0; r < minrows; r++) {
        for (let c = newcolumns; c < oldcolumns; c++) {
          removals.push(this.components[r * oldcolumns + c])
        }
      }

      this.remove(removals)
    }

    this.set({
      widths: this.widths,
      heights: this.heights
    })

    this.setCellsData()
  }

  getRowColumn(cell) {
    var idx = this.components.indexOf(cell)

    return {
      column: idx % this.columns,
      row: Math.floor(idx / this.columns)
    }
  }

  getCellsByRow(row) {
    return this.components.slice(row * this.columns, (row + 1) * this.columns)
  }

  getCellsByColumn(column) {
    var cells = []
    for (let i = 0; i < this.rows; i++) cells.push(this.components[this.columns * i + column])

    return cells
  }

  mergeCells(cells) {}

  splitCells(cells) {}

  deleteRows(cells) {}

  deleteColumns(cells) {
    // 만약 선택한 셀이 병합된 셀이라면 삭제하지 않는다.
    if (cells[0].merged == true) return false
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()

    columns.forEach(column => {
      var widths = this.widths.slice()
      this.remove(this.getCellsByColumn(column))

      widths.splice(column, 1)
      this.model.columns -= 1 // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.
      this.set('widths', widths)
    })
  }

  insertCellsAbove(cells) {}

  insertCellsBelow(cells) {}

  insertCellsLeft(cells) {
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()
    // 열 2개 이상은 추가 안함. 임시로 막아놓음
    if (columns.length >= 2) return false
    let insertionColumnPosition = columns[0]
    let newbieColumnWidths = []
    let newbieCells = []
    columns.forEach(column => {
      for (let i = 0; i < this.rows; i++)
        newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
      newbieColumnWidths.push(this.widths[column])

      let increasedColumns = this.columns
      let index = this.rows
      newbieCells.reverse().forEach(cell => {
        if (index == 0) {
          index = this.rows
          increasedColumns++
        }

        index--
        this.insertComponentAt(cell, insertionColumnPosition + index * increasedColumns)
      })

      let widths = this.widths.slice()
      this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

      widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

      this.set('widths', widths)
    })
  }

  insertCellsRight(cells) {
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()
    // 열 2개 이상은 추가 안함. 임시로 막아놓음
    if (columns.length >= 2) return false
    let insertionColumnPosition = columns[columns.length - 1] + 1
    let newbieColumnWidths = []
    let newbieCells = []
    columns.forEach(column => {
      for (let i = 0; i < this.rows; i++)
        newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
      newbieColumnWidths.push(this.widths[column])

      let increasedColumns = this.columns
      let index = this.rows
      newbieCells.reverse().forEach(cell => {
        if (index == 0) {
          index = this.rows
          increasedColumns++
        }

        index--
        this.insertComponentAt(cell, insertionColumnPosition + index * increasedColumns)
      })

      let widths = this.widths.slice()
      this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

      widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

      this.set('widths', widths)
    })
  }

  distributeHorizontal(cells) {
    var columns = []

    cells.forEach(cell => {
      let rowcolumn = this.getRowColumn(cell)

      if (-1 == columns.indexOf(rowcolumn.column)) columns.push(rowcolumn.column)
    })

    var sum = columns.reduce((sum, column) => {
      return sum + this.widths[column]
    }, 0)

    var newval = Math.round((sum / columns.length) * 100) / 100
    var widths = this.widths.slice()
    columns.forEach(column => {
      widths[column] = newval
    })

    this.set('widths', widths)
  }

  distributeVertical(cells) {}
}

Component.register('data-list', DataList)
