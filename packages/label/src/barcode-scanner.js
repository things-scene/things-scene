/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: []
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'
import '@things-factory/barcode-ui'

export default class BarcodeScanner extends HTMLOverlayElement {
  static get nature() {
    return NATURE
  }

  get data() {
    return this._data
  }

  set data(data) {
    this._data = data
    this.executeMappings() // 이전 데이터와 비교하지 않고 매핑을 실행하기 위함
  }

  dispose() {
    super.dispose()
  }

  ready() {
    super.ready()
    var scanInput = this.element
    // 엔터 키 입력 시 컴포넌트 데이터 세팅
    scanInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        if (scanInput.input) this.data = scanInput.input.value
      }
    })

    // 스캔 시 컴포넌트 데이터 세팅
    var scan = scanInput.scan
    scanInput.scan = e =>
      scan.call(scanInput, e).then(() => {
        if (scanInput.input) this.data = scanInput.input.value
      })
  }

  setElementProperties(input) {
    input.value = this._data = this.text
  }

  get tagName() {
    return 'barcode-scanable-input'
  }
}

Component.register('barcode-scanner', BarcodeScanner)
