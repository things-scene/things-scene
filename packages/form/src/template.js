/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'textarea',
      label: 'template',
      name: 'template'
    },
    {
      type: 'string',
      label: 'apply-to',
      name: 'applyTo'
    }
  ]
}

import { Component, HTMLOverlayContainer, error } from '@hatiolab/things-scene'

const FILLSTYLE = {
  type: 'pattern',
  fitPattern: true,
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAMFBMVEUAAAAdHR0AAAAAAAAAAAAREREODg4AAAATExMAAAAAAAAAAAAAAAAAAAAWFhYAAABtUS6TAAAAD3RSTlMArnboZDwVtVUHmMTU9CygGbkuAAABBklEQVR42u3Vy47DMAgFUMbE78f9/7+dqpVKFNUzwKqLnD0RvjGYbrdvF8tK9JBWieTRAO6tdQYyeWS8DfIYeONEdmlCLE+GOClkV3ASyC7gpPn+ouiODAdOeJkjHMAZF2OCE1eHK0BfkLXho5yU8XVsjKWKj7E1iya/44kvpcdLJa3LOdg3zIIr2fg7qEd4umYQXpJqiPZyVbQwsMXJtoq889CwkUknMT6ai5QOfBRcb4oY1fMmiBnV1TFk+YDooST6T30UM7a4h5hoS4r/wjnEusleLeiusPFKFwhXCx0GXHUjZBmrDJNRfQ2IYthDYv/grwmrqG1AtV0ShKuF+ONQ6Hb7Hr9EkkNRgwrYbAAAAABJRU5ErkJggg=='
}

export default class Template extends HTMLOverlayContainer {
  createElement() {
    super.createElement()

    this.element.value = this.get('value') || ''
    this.element.onchange = e => {
      this.set('value', this.element.value)
    }
  }

  dispose() {
    super.dispose()

    this.targets && this.targets.forEach(target => (target.shadowRoot.innerHTML = '<slot></slot>'))
    delete this.targets
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   */
  setElementProperties(template) {
    template.innerHTML = this.state.template
  }

  /*
   * 컴포넌트가 ready 상태가 되거나, 컴포넌트의 속성이 변화될 시 setElementProperties 뒤에 호출된다.
   * 변화에 따른 기본적인 html 속성이 super.reposition()에서 진행되고, 그 밖의 작업이 필요할 때, 오버라이드 한다.
   */
  reposition() {
    super.reposition()

    var old_targets = this.targets || []
    var targets =
      this.rootModel && Array.prototype.slice.call(this.rootModel.overlay.querySelectorAll(this.state.applyTo))

    targets &&
      targets.forEach(target => {
        try {
          !target.shadowRoot && target.attachShadow({ mode: 'open' })
          target.shadowRoot.innerHTML = this.state.template
        } catch (e) {
          error(e)
        }

        let idx = old_targets.indexOf(target)
        if (idx >= 0) old_targets.splice(idx, 1)
      })

    old_targets.forEach(target => (target.shadowRoot.innerHTML = '<slot></slot>'))

    this.targets = targets
  }

  get tagName() {
    return 'template'
  }

  get fillStyle() {
    return FILLSTYLE
  }

  get nature() {
    return NATURE
  }
}

Component.register('template', Template)
