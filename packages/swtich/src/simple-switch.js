/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: "checkbox",
      label: "round",
      name: "round",
    },
    {
      type: "checkbox",
      label: "on/off",
      name: "value",
    },
    {
      type: "color",
      label: "on-color",
      name: "onColor",
    },
    {
      type: "color",
      label: "off-color",
      name: "offColor",
    },
    {
      type: "color",
      label: "thumbnail-color",
      name: "thumbnailColor",
    },
  ],
  "value-property": "value",
};

import { Component, HTMLOverlayElement, error } from "@hatiolab/things-scene";
import "./simple-switch-element";

export default class SimpleSwitch extends HTMLOverlayElement {
  static get nature() {
    return NATURE;
  }

  oncreate_element(toggle) {
    toggle.addEventListener("value-change", (e) => {
      var checked = e.detail;

      this.set({
        value: checked,
        data: checked,
      });
    });
  }

  dispose() {
    super.dispose();
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   *
   * ThingsComponent state => HTML element properties
   */
  setElementProperties(toggle) {
    var { round, value, onColor, offColor, thumbnailColor } = this.state;

    toggle.round = round;
    toggle.value = "true" == String(value);

    onColor && toggle.style.setProperty("--on-color", onColor);
    offColor && toggle.style.setProperty("--off-color", offColor);
    thumbnailColor &&
      toggle.style.setProperty("--thumbnail-color", thumbnailColor);
  }

  /*
   * 컴포넌트가 ready 상태가 되거나, 컴포넌트의 속성이 변화될 시 setElementProperties 뒤에 호출된다.
   * 변화에 따른 기본적인 html 속성이 super.reposition()에서 진행되고, 그 밖의 작업이 필요할 때, 오버라이드 한다.
   */
  reposition() {
    super.reposition();

    var element = this.element;

    if (!element) {
      return;
    }

    var { height, width } = this.bounds;

    element.style.setProperty("--fullwidth", `${width}px`);
    element.style.setProperty("--fullheight", `${height}px`);
    element.style.setProperty(
      "--thumbnail-size",
      `${Math.min(height, width)}px`
    );
  }

  get tagName() {
    return "simple-switch";
  }
}

Component.register("simple-switch", SimpleSwitch);
