import { LitElement, html, css } from 'lit-element'

import './simple-grid-cell'

class SimpleGridView extends LitElement {
  constructor() {
    super()

    this.data = []
    this.fields = []
    this.headers = []
    this.widths = []
    this.heights = []
  }

  static get properties() {
    return {
      /**
       * headers
       *
       * headers : [{
       *   width: 100,
       *   text: 'AAA',
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
       * }, {
       *   ...
       * }]
       */
      headers: Array,
      /**
       * fields
       *
       * fields : [{
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
       * }, {
       *   ...
       * }]
       *
       */
      fields: Array,
      widths: Array,
      heights: Array,
      data: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
        }

        #header {
          height: var(--simple-grid-header-height);

          display: grid;
          grid-template-columns: var(--simple-grid-template-columns);

          overflow: hidden;
        }

        #records {
          flex: 1;

          display: grid;
          grid-template-columns: var(--simple-grid-template-columns);

          overflow-x: hidden;
          overflow-y: overlay;
        }

        #records > simple-grid-cell {
          height: var(--simple-grid-record-height);
        }
      `
    ]
  }

  updated(changes) {
    // if (changes.has('headers')) {
    //   this.style.setProperty(
    //     '--simple-grid-template-columns',
    //     this.headers.map(header => `${header.width}fr`).join(' ')
    //   )
    //   this.style.setProperty('--simple-grid-header-height', '60px')
    // }

    if (changes.has('widths')) {
      this.style.setProperty('--simple-grid-template-columns', this.widths.map(width => `${width}fr`).join(' '))
    }

    if (changes.has('heights')) {
      var headerHeight = (this.heights[0] / this.heights.reduce((sum, h) => sum + h, 0)) * this.offsetHeight
      var recordHeight = (this.heights[1] / this.heights.reduce((sum, h) => sum + h, 0)) * this.offsetHeight

      this.style.setProperty('--simple-grid-header-height', `${headerHeight}px`)
      this.style.setProperty('--simple-grid-record-height', `${recordHeight}px`)
    }
  }

  render() {
    return html`
      <div id="header">
        ${this.headers.map(
          header =>
            html`
              <simple-grid-cell .field=${header} .data=${header.text}></simple-grid-cell>
            `
        )}
      </div>

      <div id="records">
        ${(this.data.length > 0 ? this.data : [{}]).map(
          record => html`
            ${this.fields.map(
              field => html`
                <simple-grid-cell .field=${field} .data=${record[field.property]}></simple-grid-cell>
              `
            )}
          `
        )}
      </div>
    `
  }
}

customElements.define('simple-grid-view', SimpleGridView)
