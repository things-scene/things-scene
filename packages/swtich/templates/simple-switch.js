import icon from "../assets/icon-simple-switch.png";

export default {
  type: "simple-switch",
  description: "simple-switch",
  group: "IoT",
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: "simple-switch",
    left: 10,
    top: 10,
    width: 100,
    height: 40,
    thumbnailColor: "#ffffff",
    onColor: "#2196f3",
    offColor: "#cccccc"
  }
};
