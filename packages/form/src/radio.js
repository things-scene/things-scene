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
      label: 'value',
      name: 'value'
    },
    {
      type: 'number',
      label: 'size',
      name: 'size'
    },
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'checkbox',
      label: 'checked',
      name: 'checked'
    }
  ],
  'value-property': 'value'
}

import Input from './input'

import { Component } from '@hatiolab/things-scene'

export default class Radio extends Input {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return 'radio'
  }

  createElement() {
    this.element = document.createElement('label')
    if (!this.element) return

    var input = document.createElement('input')
    this.element.appendChild(input)

    var text = document.createElement('p')
    text.style.display = 'inline'
    text.innerHTML = this.get('text')
    this.element.appendChild(text)

    this.setElementProperties(this.element)

    if (this.parent.isHTMLElement && this.parent.isHTMLElement()) this.parent.element.appendChild(this.element)
    else this.root.model_layer.overlay.appendChild(this.element)

    Component.reposition(this)
    this.oncreate_element && this.oncreate_element(this.element)
  }

  setElementProperties(element) {
    var eText = this.element.querySelector('text')
    var eInput = this.element.querySelector('input')

    var { text, checked, value } = this.state

    if (eText) {
      eText.textContent = text
    }

    if (eInput) {
      eInput.checked = checked
      eInput.value = value
    }

    super.setElementProperties(eInput)
  }
  postrender(context) {
    /* postrender() 함수는 거의 상속하지 않는다.
     * 텍스트, 효과, 애니메이션 등 컴포넌트 공통 기능에 대한 표현을 담당한다.
     */
    this.changeText(context)
  }
  changeText(context) {
    if (this.text && this.hasTextProperty && this.element.querySelector('p')) {
      this.element.querySelector('p').innerText = this.text
    }
  }
}

Component.register('input-radio', Radio)
