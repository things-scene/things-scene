import icon from "./barcode-scanner.png";

export default {
  type: "barcode-scanner",
  description: "barcode-scanner",
  group: "form",
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: "barcode-scanner",
    left: 10,
    top: 10,
    width: 200,
    height: 30,
    lineWidth: 1
  }
};
