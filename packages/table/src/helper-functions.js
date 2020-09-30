import { Model } from '@hatiolab/things-scene'

export const SIDES = {
  all: ['top', 'left', 'bottom', 'right'],
  out: ['top', 'left', 'bottom', 'right'],
  left: ['left'],
  right: ['right'],
  top: ['top'],
  bottom: ['bottom'],
  leftright: ['left', 'right'],
  topbottom: ['top', 'bottom']
}

export const CLEAR_STYLE = {
  strokeStyle: '',
  lineDash: 'solid',
  lineWidth: 0
}

export const DEFAULT_STYLE = {
  strokeStyle: '#999',
  lineDash: 'solid',
  lineWidth: 1
}

export function buildNewCell(type, app) {
  return Model.compile(
    {
      type,
      strokeStyle: 'blue',
      left: 0,
      top: 0,
      width: 1,
      height: 1,
      textWrap: true,
      border: buildBorderStyle(DEFAULT_STYLE, 'all')
    },
    app
  )
}

export function buildCopiedCell(copy, app) {
  var obj = JSON.parse(JSON.stringify(copy))
  delete obj.text
  return Model.compile(obj, app)
}

export function buildBorderStyle(style, where) {
  return (SIDES[where] || []).reduce((border, side) => {
    border[side] = style
    return border
  }, {})
}

export function setCellBorder(cell, style, where) {
  if (!cell) return
  cell.set('border', Object.assign({}, cell.get('border') || {}, buildBorderStyle(style, where)))
}

export function isLeftMost(total, columns, indices, i) {
  return i == 0 || !(i % columns) || indices.indexOf(i - 1) == -1
}

export function isRightMost(total, columns, indices, i) {
  return i == total - 1 || i % columns == columns - 1 || indices.indexOf(i + 1) == -1
}

export function isTopMost(total, columns, indices, i) {
  return i < columns || indices.indexOf(i - columns) == -1
}

export function isBottomMost(total, columns, indices, i) {
  return i > total - columns - 1 || indices.indexOf(i + columns) == -1
}

export function above(columns, i) {
  return i - columns
}

export function below(columns, i) {
  return i + columns
}

export function before(columns, i) {
  return !(i % columns) ? -1 : i - 1
}

export function after(columns, i) {
  return !((i + 1) % columns) ? -1 : i + 1
}

export function array(value, size) {
  var arr = []
  for (let i = 0; i < size; i++) arr.push(1)
  return arr
}

export var columnControlHandler = {
  ondragmove: function(point, index, component) {
    var { left, width } = component.textBounds
    var widths_sum = component.widths_sum

    var widths = component.widths.slice()

    /* 컨트롤의 원래 위치를 구한다. */
    var origin_pos_unit = widths.slice(0, index + 1).reduce((sum, width) => sum + width, 0)
    var origin_offset = left + (origin_pos_unit / widths_sum) * width

    /*
     * point의 좌표는 부모 레이어 기준의 x, y 값이다.
     * 따라서, 도형의 회전을 감안한 좌표로의 변환이 필요하다.
     * Transcoord시에는 point좌표가 부모까지 transcoord되어있는 상태이므로,
     * 컴포넌트자신에 대한 transcoord만 필요하다.(마지막 파라미터를 false로).
     */
    var transcoorded = component.transcoordP2S(point.x, point.y)
    var diff = transcoorded.x - origin_offset

    var diff_unit = (diff / width) * widths_sum

    var min_width_unit = (widths_sum / width) * 10 // 10픽셀정도를 최소로

    if (diff_unit < 0) diff_unit = -Math.min(widths[index] - min_width_unit, -diff_unit)
    else diff_unit = Math.min(widths[index + 1] - min_width_unit, diff_unit)

    widths[index] = Math.round((widths[index] + diff_unit) * 100) / 100
    widths[index + 1] = Math.round((widths[index + 1] - diff_unit) * 100) / 100

    component.set('widths', widths)
  }
}

export var rowControlHandler = {
  ondragmove: function(point, index, component) {
    var { top, height } = component.textBounds
    var heights_sum = component.heights_sum

    var heights = component.heights.slice()

    /* 컨트롤의 원래 위치를 구한다. */
    index -= component.columns - 1
    var origin_pos_unit = heights.slice(0, index + 1).reduce((sum, height) => sum + height, 0)
    var origin_offset = top + (origin_pos_unit / heights_sum) * height

    /*
     * point의 좌표는 부모 레이어 기준의 x, y 값이다.
     * 따라서, 도형의 회전을 감안한 좌표로의 변환이 필요하다.
     * Transcoord시에는 point좌표가 부모까지 transcoord되어있는 상태이므로,
     * 컴포넌트자신에 대한 transcoord만 필요하다.(마지막 파라미터를 false로).
     */
    var transcoorded = component.transcoordP2S(point.x, point.y)
    var diff = transcoorded.y - origin_offset

    var diff_unit = (diff / height) * heights_sum

    var min_height_unit = (heights_sum / height) * 10 // 10픽셀정도를 최소로

    if (diff_unit < 0) diff_unit = -Math.min(heights[index] - min_height_unit, -diff_unit)
    else diff_unit = Math.min(heights[index + 1] - min_height_unit, diff_unit)

    heights[index] = Math.round((heights[index] + diff_unit) * 100) / 100
    heights[index + 1] = Math.round((heights[index + 1] - diff_unit) * 100) / 100

    component.set('heights', heights)
  }
}
