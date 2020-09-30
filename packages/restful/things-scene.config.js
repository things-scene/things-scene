import icon from './assets/restful.png';

var templates = [{
  type: 'restful',
  description: 'restful client',
  group: 'dataSource', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: "restful",
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true,
    dataFormat: 'json'
  }
}];

export default {
  templates
};
