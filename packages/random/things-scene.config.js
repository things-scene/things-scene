import icon from './assets/random.png';

var templates = [{
  type: 'random',
  description: 'random data generator',
  group: 'dataSource', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: "random",
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true,
    dataFormat: 'json',
    format: 'integer',
    period: 5000,
    count: 1
  }
}];

export default {
  templates
};
