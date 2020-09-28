/*
 * Copyright � HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'endpoint',
      name: 'endpoint'
    },
    {
      type: 'string',
      label: 'soap-action',
      name: 'soapAction'
    },
    {
      type: 'string',
      label: 'method',
      name: 'method'
    },
    {
      type: 'string',
      label: 'namespace',
      name: 'namespace'
    },
    {
      type: 'number',
      label: 'period',
      name: 'period'
    },
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'string',
      label: 'authorization',
      name: 'authorization'
    },
    {
      type: 'checkbox',
      label: 'with-credentials',
      name: 'withCredentials'
    },
    {
      type: 'checkbox',
      label: 'submit-on-load',
      name: 'submitOnLoad'
    },
    {
      type: 'checkbox',
      label: 'debug',
      name: 'debug'
    }
  ],
  'value-property': 'endpoint'
}

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'
import { xml2js } from 'xml-js'

export default class SoapClient extends HTMLOverlayContainer {
  dispose() {
    super.dispose()
    this._stopRepeater()
  }

  get tagName() {
    return 'form'
  }

  setElementProperties(form) {
    var { endpoint = '', name = '' } = this.state

    form.action = endpoint
    form.method = 'POST'
    form.name = name
  }

  get endpoint() {
    return this.state.endpoint
  }

  set endpoint(endpoint) {
    this.setState('endpoint', endpoint)
    this._startRepeater()
  }

  get period() {
    return this.state.period * 1000
  }

  set period(period) {
    this.setState('period', period)
    this._startRepeater()
  }

  _startRepeater() {
    this._stopRepeater()

    if (!this.app.isViewMode) return

    if (this.period) {
      this._repeatInterval = setInterval(this._submit.bind(this), this.period)
    }
  }

  _stopRepeater() {
    if (this._repeatInterval) clearInterval(this._repeatInterval)
  }

  _onload(e) {
    var result = e.target.response
    try {
      result = xml2js(result, {
        compact: true
      })

      if (this.state.debug) {
        console.log('[SOAP-RESULT]', result)
      }

      this.setState('data', result)
    } catch (e) {
      console.error(e)
    }
  }

  oncreate_element(form) {
    if (!this.app.isViewMode) return

    var _ = e => {
      e.preventDefault()

      var { endpoint, soapAction, method, namespace, debug } = this.state

      var xhr = new XMLHttpRequest()

      var params = [].filter
        .call(form.elements, el => {
          if (el.type == 'radio' || el.type == 'checkbox') return el.checked
          return true
        })
        .filter(el => {
          return !!el.name
        })
        .filter(el => {
          return !el.disabled
        })
        .map(el => {
          return `<${el.name}>${el.value}</${el.name}>`
        })
        .join('\n      ')

      xhr.onloadend = this._onload.bind(this)

      xhr.open('POST', endpoint)

      xhr.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8')
      xhr.setRequestHeader('SOAPAction', `${endpoint}#${soapAction}`)

      if (this.get('authorization')) xhr.setRequestHeader('Authorization', this.get('authorization'))
      if (this.get('withCredentials')) xhr.withCredentials = true

      let soapEnvelope = `
<s:Envelope 
  xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header/>
  <s:Body>
    <ns0:${method} xmlns:ns0="${namespace}">
      ${params}
    </ns0:${method}>
  </s:Body>
</s:Envelope>
`

      if (debug) {
        console.log('[SOAP-REQUEST-ENVELOPE]', soapEnvelope)
      }

      xhr.send(soapEnvelope)

      return false
    }

    form.onsubmit = _

    if (this.getState('submitOnLoad')) {
      setTimeout(this._submit.bind(this), 100)
    }

    this._startRepeater()
  }

  _submit() {
    this.element.dispatchEvent(
      new Event('submit', {
        cancelable: true
      })
    )
  }

  get nature() {
    return NATURE
  }
}

Component.register('soap-client', SoapClient)
