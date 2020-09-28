import { LitElement, html, css } from "lit-element";

class SimpleSwitchElement extends LitElement {
  static get properties() {
    return {
      round: Boolean,
      value: Boolean
    };
  }

  static get styles() {
    return css`
      /* The switch - the box around the slider */
      label {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      /* Hide default HTML checkbox */
      label input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      span {
        position: absolute;
        cursor: pointer;
        width: var(--fullwidth);
        height: var(--fullheight);
        top: calc(0 - var(--thumbnail-size));
        left: 0;
        background-color: var(--off-color, #ccc);
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      span:before {
        position: absolute;
        content: "";
        height: calc(var(--thumbnail-size) - 8px);
        width: calc(var(--thumbnail-size) - 8px);
        left: 4px;
        top: 4px;
        background-color: var(--thumbnail-color, white);
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + span {
        background-color: var(--on-color, #2196f3);
      }

      input:checked + span:before {
        -webkit-transform: translateX(
            calc(var(--fullwidth) - var(--thumbnail-size))
          )
          translateY(calc(var(--fullheight) - var(--thumbnail-size)));
        -ms-transform: translateX(
            calc(var(--fullwidth) - var(--thumbnail-size))
          )
          translateY(calc(var(--fullheight) - var(--thumbnail-size)));
        transform: translateX(calc(var(--fullwidth) - var(--thumbnail-size)))
          translateY(calc(var(--fullheight) - var(--thumbnail-size)));
      }

      /* Rounded sliders */
      span[round] {
        border-radius: calc(var(--thumbnail-size) / 2);
      }

      span[round]:before {
        border-radius: calc((var(--thumbnail-size) - 8px) / 2);
      }
    `;
  }

  render() {
    return html`
      <label>
        <input type="checkbox" .checked=${this.value} />
        <span ?round=${this.round}></span>
      </label>
    `;
  }

  firstUpdated() {
    this.shadowRoot.addEventListener("change", e => {
      this.value = e.target.checked;
      this.dispatchEvent(
        new CustomEvent("value-change", {
          detail: this.value
        })
      );
    });
  }
}

customElements.define("simple-switch", SimpleSwitchElement);
