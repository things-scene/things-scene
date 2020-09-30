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
      label: "vendor id",
      name: "vendorId"
    },
    {
      type: "board-selector",
      label: "board id",
      name: "boardId"
    }
  ]
};

import {
  Component,
  ValueHolder,
  RectPath,
  Shape,
  error
} from "@hatiolab/things-scene";
import { USBPrinter } from "./usb-printer";
import COMPONENT_IMAGE from "../assets/label-printer.png";

export default class LabelPrinter extends ValueHolder(RectPath(Shape)) {
  static get nature() {
    return NATURE;
  }

  static get image() {
    if (!LabelPrinter._image) {
      LabelPrinter._image = new Image();
      LabelPrinter._image.src = COMPONENT_IMAGE;
    }

    return LabelPrinter._image;
  }

  dispose() {
    super.dispose();
  }

  render(context) {
    /*
     * TODO printable 상태를 구분할 수 있는 표시를 추가할 것.
     */

    var { left, top, width, height } = this.bounds;

    context.beginPath();
    context.drawImage(LabelPrinter.image, left, top, width, height);
  }

  onchangeData(after, before) {
    this.print(after.data);
  }

  async print(data) {
    if (
      !this.app.isViewMode ||
      data.constructor !== Object ||
      Object.keys(data).length === 0
    ) {
      /* in cases of
       * - edit mode
       * - data is not a object
       * - data object is empty
       * we doesn't print
       */
      return;
    }

    var { boardId, vendorId } = this.state;

    var searchParams = new URLSearchParams();
    for (var key in data) {
      searchParams.append(key, data[key]);
    }
    const response = await fetch(
      `/label-command/${boardId}?${searchParams.toString()}`,
      {
        method: "GET"
      }
    );

    var command = await response.text();

    try {
      if (!this.printer) {
        this.printer = new USBPrinter(
          vendorId
            ? [
                {
                  vendorId: Number(vendorId)
                }
              ]
            : null
        );
      }

      await this.printer.connectAndPrint(command);
    } catch (e) {
      throw new Error(e);
    }
  }
}

Component.register("label-printer", LabelPrinter);
