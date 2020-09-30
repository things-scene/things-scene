import { LitElement, html, css } from 'lit-element'

function borderStyle(border = {}) {
  return `${border.lineWidth || 1}px ${border.lineDash || 'solid'} ${border.strokeStyle || 'black'}`
}

class SimpleGridCell extends LitElement {
  constructor() {
    super()

    this.data = {}
    this.field = {}
  }

  static get properties() {
    return {
      /**
       * field
       *
       * field : {
       *   property: 'aaa',
       *   border: {
       *     top: {
       *       strokeStyle: '',
       *       lineWidth: 2,
       *       lineDash: 'solid'
       *     },
       *     left: {
       *       strokeStyle: '',
       *       lineWidth: 2,
       *       lineDash: 'solid'
       *     },
       *     bottom: {
       *       strokeStyle: '',
       *       lineWidth: 2,
       *       lineDash: 'solid'
       *     },
       *     right: {
       *       strokeStyle: '',
       *       lineWidth: 2,
       *       lineDash: 'solid'
       *     },
       *   }
       * }
       */
      field: Object,
      data: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          overflow: hidden;

          background-color: var(--cell-background-color);
          color: var(--cell-color);

          border-top: var(--cell-border-top);
          border-bottom: var(--cell-border-bottom);
          border-left: var(--cell-border-left);
          border-right: var(--cell-border-right);

          text-align: var(--cell-text-align);
          vertical-align: var(--cell-vertical-align);

          padding: var(--cell-padding);

          font: var(--cell-font);
        }
      `
    ]
  }

  updated(changes) {
    if (changes.has('field')) {
      console.log('field', this.field.state)
      var {
        border = {},
        fillStyle,
        fontColor,
        strokeStyle,
        textAlign,
        paddingTop = 0,
        paddingBottom = 0,
        paddingLeft = 0,
        paddingRight = 0,

        // id,
        bold,
        italic,

        fontFamily = 'system',
        textBaseline,

        fontSize = 15,
        lineHeight = fontSize * 1.2,
        lineWidth = 0,
        lineDash
      } = this.field.state

      var style = this.style

      style.setProperty('--cell-border-top', borderStyle(border.top))
      style.setProperty('--cell-border-bottom', borderStyle(border.bottom))
      style.setProperty('--cell-border-left', borderStyle(border.left))
      style.setProperty('--cell-border-right', borderStyle(border.right))

      style.setProperty('--cell-background-color', fillStyle)
      style.setProperty('--cell-color', fontColor)
      style.setProperty('--cell-text-align', textAlign == 'end' ? 'right' : textAlign == 'start' ? 'left' : 'center')
      style.setProperty('--cell-vertical-align', textBaseline)

      style.setProperty('--cell-padding', `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`)
      style.setProperty(
        '--cell-font',
        [bold, italic, `${fontSize}px/${lineHeight}px`, fontFamily].filter(i => !!i).join(' ')
      )
    }
  }

  render() {
    return html`
      <text>${this.data}</text>
    `
  }
}

customElements.define('simple-grid-cell', SimpleGridCell)
