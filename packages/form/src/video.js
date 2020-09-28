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
      label: 'src',
      name: 'src'
    },
    {
      type: 'checkbox',
      label: 'started',
      name: 'started'
    },
    {
      type: 'checkbox',
      label: 'controls',
      name: 'controls'
    }
  ],
  'value-property': 'src'
}

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'
import Hls from '!hls.js'

export default class Video extends HTMLOverlayElement {
  async oncreate_element(video) {
    var { src, started } = this.state

    video.addEventListener('canplay', () => {
      this.started && video.play()
    })

    this.onchangesrc(src)
    this.onchangestarted(started)
  }

  dispose() {
    this.reset()
    super.dispose()
  }

  reset() {
    this._hlsSupporter && this._hlsSupporter.destroy()
    delete this._hlsSupporter
  }

  onchange(after, before) {
    super.onchange(after, before)

    'src' in after && this.onchangesrc(after.src)
    'started' in after && this.onchangestarted(after.started)
  }

  setElementProperties(video) {
    var { controls } = this.state

    if (controls) video.setAttribute('controls', true)
    else video.removeAttribute('controls')
  }

  onchangestarted(started) {
    var video = this.element

    if (started) {
      /*
        [ video.readyState ]
        0 = HAVE_NOTHING - no information whether or not the audio/video is ready
        1 = HAVE_METADATA - metadata for the audio/video is ready
        2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
        3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
        4 = HAVE_ENOUGH_DATA - enough data available to start playing
      */
      video.readyState == 4 && video.play()
    } else {
      video.pause()
    }
  }

  onchangesrc(src) {
    this.reset()

    var video = this.element

    if (!video) return

    video.src = src

    if (src.endsWith('.m3u8') && Hls.isSupported()) {
      // http-live-streaming protocol
      this._hlsSupporter = new Hls()
      this._hlsSupporter.loadSource(src)
      this._hlsSupporter.attachMedia(video)

      this._hlsSupporter.on(Hls.Events.MANIFEST_PARSED, () => {
        this.started && video.play()
      })
      // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
      // When the browser has built-in HLS support (check using `canPlayType`),
      // we can provide an HLS manifest(i.e. .m3u8 URL) directly to the video element throught the`src` property.
      // This is using the built-in support of the plain video element, without using hls.js.
      // [ sample ... ]
      // if (video.canPlayType('application/vnd.apple.mpegurl')) {
      //   console.log('m3u8 supporting browser...')
      //   video.addEventListener('canplay', () => {
      //     video.play()
      //   })
      // }
    }
  }

  get src() {
    return this.getState('src')
  }

  set src(src) {
    this.setState('src', src)
  }

  get started() {
    return this.getState('started')
  }

  set started(started) {
    this.setState('started', started)
  }

  get nature() {
    return NATURE
  }
}

Component.register('video', Video)
