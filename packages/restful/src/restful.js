/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: "string",
      label: "url",
      name: "url"
    },
    {
      type: "number",
      label: "period",
      name: "period",
      placeholder: "SECONDS"
    },
    {
      type: "select",
      label: "data-format",
      name: "dataFormat",
      property: {
        options: [
          {
            display: "Plain Text",
            value: "text"
          },
          {
            display: "JSON",
            value: "json"
          },
          {
            display: "JSONP",
            value: "jsonp"
          }
        ]
      }
    },
    {
      type: "checkbox",
      label: "with-credentials",
      name: "withCredentials"
    }
  ],
  "value-property": "url"
};

const REST_IMAGE =
  "data:image/png;base64,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";

const WARN_NO_URL = "Valid URL property required";

import {
  Component,
  DataSource,
  RectPath,
  Shape,
  warn
} from "@hatiolab/things-scene";
import jsonp from "./jsonp";

export default class Restful extends DataSource(RectPath(Shape)) {
  static get image() {
    if (!Restful._image) {
      Restful._image = new Image();
      Restful._image.src = REST_IMAGE;
    }

    return Restful._image;
  }

  get url() {
    return this.getState("url");
  }

  set url(url) {
    this.setState("url", url);
    this._initRestful();
  }

  get period() {
    return this.state.period * 1000;
  }

  set period(period) {
    this.setState("period", period);
    this._initRestful();
  }

  get withCredentials() {
    return !!this.getState("withCredentials");
  }

  set withCredentials(withCredentials) {
    this.setState("withCredentials", withCredentials);
    this._initRestful();
  }

  get repeatTimer() {
    return this._repeatTimer;
  }

  set repeatTimer(repeatTimer) {
    this._stopRepeater();
    this._repeatTimer = repeatTimer;
  }

  get httpRequest() {
    return this._httpRequest;
  }

  set httpRequest(httpRequest) {
    this._httpRequest = httpRequest;
  }

  ready() {
    this._initRestful();
  }

  _initRestful() {
    if (!this.app.isViewMode) return;

    if (!this.url) {
      warn(WARN_NO_URL);
      return;
    }

    this._stopRepeater();
    this._startRepeater();
  }

  dispose() {
    super.dispose();
    this._stopRepeater();
  }

  _startRepeater() {
    this._isStarted = true;

    var self = this;

    // requestAnimationFrame 이 호출되지 않을 때는 ajax 호출도 하지 않도록 함.
    function _() {
      if (!self._isStarted) {
        return;
      }
      self.callAjax();

      if (!self.period) {
        self._stopRepeater();
        return;
      }

      self._repeatTimer = setTimeout(() => {
        requestAnimationFrame(_);
      }, self.period);
    }

    requestAnimationFrame(_);
  }

  _stopRepeater() {
    this._abortRequest();

    if (this.repeatTimer) clearTimeout(this._repeatTimer);
    this._isStarted = false;
  }

  _makeRequest(url) {
    if (window.XMLHttpRequest) {
      // Mozilla, Safari, ...
      this.httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE
      try {
        this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }

    if (!this.httpRequest) {
      warn("Giving up :( Cannot create an XMLHTTP instance");
      return false;
    }
    this.httpRequest.withCredentials = this.withCredentials;
    this.httpRequest.open("GET", url);
    this.httpRequest.onreadystatechange = this.onDataReceived.bind(this);

    return true;
  }

  _makeRequestJsonp(url) {
    jsonp(url, {}, (self, data) => {
      if (!data) return;

      this.data = data;
    });
  }

  _abortRequest() {
    if (this.httpRequest) this.httpRequest.abort();
  }

  onDataReceived() {
    var { dataFormat = "text" } = this.state;

    if (this.httpRequest.readyState === 4) {
      if (this.httpRequest.status === 200) {
        var data = this.httpRequest.responseText;

        if (!data) return;

        this.data = this._convertDataFormat(data, dataFormat);
      }
    }
  }

  callAjax() {
    var { dataFormat = "text" } = this.state;

    if (dataFormat == "jsonp") {
      this._makeRequestJsonp(this.substitute(this.url, this));
    } else {
      if (!this._makeRequest(this.substitute(this.url, this))) return;

      this.httpRequest.send();
    }
  }

  _draw(context) {
    var { left, top, width, height } = this.bounds;

    context.beginPath();
    context.drawImage(Restful.image, left, top, width, height);
  }

  ondblclick(e) {
    if (!this.url) {
      warn(WARN_NO_URL);
      return;
    }

    this.callAjax();
  }

  get controls() {}

  get nature() {
    return NATURE;
  }
}

Component.register("restful", Restful);
