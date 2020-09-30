/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

// 참고 웹페이지.
// http://www.neodynamic.com/Products/Help/BarcodeWinControl2.5/working_barcode_symbologies.htm
// const BARCODE_REGEXP = {
//   'code11': /^[0-9\-]*$/,
//   'codebar': /^[A-D][0-9\+$:\-/.]*[A-D]$/,
//   'code39': {
//     'normal': /^[0-9A-Z\-.$/\+%\*\s]*$/,
//     'extended': /^[\000-\177]*$/
//   },
//   'code93': {
//     'normal': /^[0-9A-Z\-.$/\+%\*\s]*$/,
//     'extended': /^[\000-\177]*$/
//   },
//   'code128': {
//     'auto': /^[\000-\177]*$/,
//     'A': /^[\000-\137]*$/,
//     'B': /^[\040-\177]*$/,
//     'C': /^(([0-9]{2})+?)*$/
//   },
//   'datamatrix': /^[\x00-\xff]*$/, // 멀티바이트 캐릭터는 안됨 ?
//   'ean8': /^\d{1,}$/,
//   'ean13': /^\d{1,}$/,
//   'industrial2of5': /^\d{1,}$/,
//   'interleaved2of5': /^\d{1,}$/,
//   'isbn': /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/,
//   'msi': /^\d{1,}$/,
//   'pdf417': {
//     'text-compaction': /^[\011\012\015\040-\177]*$/,
//     'binary-compaction': /^[\x00-\xff]*$/
//   },
//   'planet': /^\d{1,}$/,
//   'postnet': /^\d{1,}$/,
//   'ean128': /^[\000-\177\xC8\xCA-\xCD]*$/,
//   'upca': /^\d{1,}$/,
//   'upce': /^\d{1,}$/
// };

/*  opts 예제 - https://github.com/bwipp/postscriptbarcode/wiki/Options-Reference
 *  includecheck, includecheckintext, includetext, textfont, textsize, textgaps, textxalign, textyalign, textxoffset, textyoffset
 *  showborder, borderwidth, borderleft, borderright, bordertop, borderbottom, barcolor, backgroundcolor, bordercolor, textcolor
 *  parse, parsefnc, height, width, inkspread, inkspreadh, inkspreadv,
 *  addontextxoffset, addontextyoffset, addontextfont, addontextsize
 *  guardwhitespace, guardwidth, guardheight, guardleftpos, guardrightpos, guardleftypos, guardrightypos
 */

// symdesc["code39"].opts = "includetext textxalign=center textgaps=2";
// symdesc["interleaved2of5"].opts = "includetext textxalign=center textgaps=1.5";
// symdesc["code93"].opts = "includetext textxalign=center textgaps=2";
// symdesc["ean13"].opts = "includetext";
// symdesc["ean8"].opts = "includetext";

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: "select",
      label: "symbol",
      name: "symbol",
      property: {
        options: [
          { value: "auspost", display: "AusPost 4 State Customer Code" },
          { value: "azteccode", display: "Aztec Code" },
          { value: "azteccodecompact", display: "Compact Aztec Code" },
          { value: "aztecrune", display: "Aztec Runes" },
          { value: "bc412", display: "BC412" },
          { value: "channelcode", display: "Channel Code" },
          { value: "codablockf", display: "Codablock F" },
          { value: "code11", display: "Code 11" },
          { value: "code128", display: "Code 128" },
          { value: "code16k", display: "Code 16K" },
          { value: "code2of5", display: "Code 25" },
          { value: "code32", display: "Italian Pharmacode" },
          { value: "code39", display: "Code 39" },
          { value: "code39ext", display: "Code 39 Extended" },
          { value: "code49", display: "Code 49" },
          { value: "code93", display: "Code 93" },
          { value: "code93ext", display: "Code 93 Extended" },
          { value: "codeone", display: "Code One" },
          { value: "coop2of5", display: "COOP 2 of 5" },
          { value: "daft", display: "Custom 4 state symbology" },
          { value: "databarexpanded", display: "GS1 DataBar Expanded" },
          {
            value: "databarexpandedcomposite",
            display: "GS1 DataBar Expanded Composite"
          },
          {
            value: "databarexpandedstacked",
            display: "GS1 DataBar Expanded Stacked"
          },
          {
            value: "databarexpandedstackedcomposite",
            display: "GS1 DataBar Expanded Stacked Composite"
          },
          { value: "databarlimited", display: "GS1 DataBar Limited" },
          {
            value: "databarlimitedcomposite",
            display: "GS1 DataBar Limited Composite"
          },
          { value: "databaromni", display: "GS1 DataBar Omnidirectional" },
          {
            value: "databaromnicomposite",
            display: "GS1 DataBar Omnidirectional Composite"
          },
          { value: "databarstacked", display: "GS1 DataBar Stacked" },
          {
            value: "databarstackedcomposite",
            display: "GS1 DataBar Stacked Composite"
          },
          {
            value: "databarstackedomni",
            display: "GS1 DataBar Stacked Omnidirectional"
          },
          {
            value: "databarstackedomnicomposite",
            display: "GS1 DataBar Stacked Omnidirectional Composite"
          },
          { value: "databartruncated", display: "GS1 DataBar Truncated" },
          {
            value: "databartruncatedcomposite",
            display: "GS1 DataBar Truncated Composite"
          },
          { value: "datalogic2of5", display: "Datalogic 2 of 5" },
          { value: "datamatrix", display: "Data Matrix" },
          {
            value: "datamatrixrectangular",
            display: "Data Matrix Rectangular"
          },
          { value: "dotcode", display: "DotCode" },
          { value: "ean13", display: "EAN-13" },
          { value: "ean13composite", display: "EAN-13 Composite" },
          { value: "ean14", display: "GS1-14" },
          { value: "ean2", display: "EAN-2 (2 digit addon)" },
          { value: "ean5", display: "EAN-5 (5 digit addon)" },
          { value: "ean8", display: "EAN-8" },
          { value: "ean8composite", display: "EAN-8 Composite" },
          { value: "flattermarken", display: "Flattermarken" },
          { value: "gs1-128", display: "GS1-128" },
          { value: "gs1-128composite", display: "GS1-128 Composite" },
          { value: "gs1-cc", display: "GS1 Composite 2D Component" },
          { value: "gs1datamatrix", display: "GS1 Data Matrix" },
          {
            value: "gs1datamatrixrectangular",
            display: "GS1 Data Matrix Rectangular"
          },
          {
            value: "gs1northamericancoupon",
            display: "GS1 North American Coupon"
          },
          { value: "gs1qrcode", display: "GS1 QR Code" },
          { value: "hanxin", display: "Han Xin Code" },
          { value: "hibcazteccode", display: "HIBC Aztec Code" },
          { value: "hibccodablockf", display: "HIBC Codablock F" },
          { value: "hibccode128", display: "HIBC Code 128" },
          { value: "hibccode39", display: "HIBC Code 39" },
          { value: "hibcdatamatrix", display: "HIBC Data Matrix" },
          {
            value: "hibcdatamatrixrectangular",
            display: "HIBC Data Matrix Rectangular"
          },
          { value: "hibcmicropdf417", display: "HIBC MicroPDF417" },
          { value: "hibcpdf417", display: "HIBC PDF417" },
          { value: "hibcqrcode", display: "HIBC QR Code" },
          { value: "iata2of5", display: "IATA 2 of 5" },
          { value: "identcode", display: "Deutsche Post Identcode" },
          { value: "industrial2of5", display: "Industrial 2 of 5" },
          { value: "interleaved2of5", display: "Interleaved 2 of 5 (ITF)" },
          { value: "isbn", display: "ISBN" },
          { value: "ismn", display: "ISMN" },
          { value: "issn", display: "ISSN" },
          { value: "itf14", display: "ITF-14" },
          { value: "japanpost", display: "Japan Post 4 State Customer Code" },
          { value: "kix", display: "Royal Dutch TPG Post KIX" },
          { value: "leitcode", display: "Deutsche Post Leitcode" },
          { value: "matrix2of5", display: "Matrix 2 of 5" },
          { value: "maxicode", display: "MaxiCode" },
          { value: "micropdf417", display: "MicroPDF417" },
          { value: "microqrcode", display: "Micro QR Code" },
          { value: "msi", display: "MSI Modified Plessey" },
          { value: "onecode", display: "USPS Intelligent Mail" },
          { value: "pdf417", display: "PDF417" },
          { value: "pdf417compact", display: "Compact PDF417" },
          { value: "pharmacode", display: "Pharmaceutical Binary Code" },
          { value: "pharmacode2", display: "Two-track Pharmacode" },
          { value: "planet", display: "USPS PLANET" },
          { value: "plessey", display: "Plessey UK" },
          { value: "posicode", display: "PosiCode" },
          { value: "postnet", display: "USPS POSTNET" },
          { value: "pzn", display: "Pharmazentralnummer (PZN)" },
          { value: "qrcode", display: "QR Code" },
          { value: "rationalizedCodabar", display: "Codabar" },
          { value: "raw", display: "Custom 1D symbology" },
          { value: "royalmail", display: "Royal Mail 4 State Customer Code" },
          { value: "sscc18", display: "SSCC-18" },
          { value: "symbol", display: "Miscellaneous symbols" },
          { value: "telepen", display: "Telepen" },
          { value: "telepennumeric", display: "Telepen Numeric" },
          { value: "ultracode", display: "Ultracode" },
          { value: "upca", display: "UPC-A" },
          { value: "upcacomposite", display: "UPC-A Composite" },
          { value: "upce", display: "UPC-E" },
          { value: "upcecomposite", display: "UPC-E Composite" }
        ]
      }
    },
    {
      type: "number",
      label: "paddingwidth",
      name: "paddingwidth"
    },
    {
      type: "number",
      label: "paddingheight",
      name: "paddingheight"
    },
    {
      type: "checkbox",
      label: "monochrome",
      name: "monochrome"
    },
    {
      type: "checkbox",
      label: "show-text",
      name: "showText"
    }
  ],
  "value-property": "text"
};

const REDRAW_PROPS = [
  "symbol",
  "text",
  "showText",
  "height",
  "width",
  "paddingwidth",
  "paddingheight"
];

import { Component, RectPath, Shape, error } from "@hatiolab/things-scene";
import bwipjs from "!bwip-js";

export default class Barcode extends RectPath(Shape) {
  static get nature() {
    return NATURE;
  }

  get canvas() {
    if (!this._canvas) {
      this._canvas = document.createElement("canvas");

      this._canvas.style.display = "none";
      this._canvas.height = 1;
      this._canvas.width = 1;
    }

    return this._canvas;
  }

  dispose() {
    super.dispose();
  }

  ready() {
    super.ready();
    this.buildImage();
  }

  buildImage() {
    var {
      symbol,
      text,
      width,
      height,
      includetext,
      textAlign,
      paddingwidth = 0,
      paddingheight = 0
    } = this.state;

    if (!text) {
      console.warn("barcode text is not specified.");
      return;
    }

    this.canvas.width = width;
    this.canvas.height = height;

    bwipjs(
      this.canvas,
      {
        bcid: symbol, // Barcode type
        text, // Text to encode
        height, // Bar height, in millimeters
        width,
        includetext, // Show human-readable text
        textxalign: textAlign, // Always good to set this
        paddingwidth,
        paddingheight
      },
      (err, cvs) => {
        if (err) {
          delete this._image;
          this.invalidate();

          error(err);
        } else {
          this._image = cvs;
          this.invalidate();
        }
      }
    );
  }

  render(context) {
    var { left, top, width, height } = this.state;

    try {
      if (this._image) {
        context.drawImage(this._image, left, top, width, height);
      }
    } catch (e) {
      error(e);
    }
  }

  drawText() {
    // to nothing
  }

  onchange(props) {
    for (let prop of REDRAW_PROPS) {
      if (prop in props) {
        this.buildImage();
        return;
      }
    }
  }
}

Component.register("barcode", Barcode);
