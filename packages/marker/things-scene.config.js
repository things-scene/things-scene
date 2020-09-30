import icon from './assets/marker.png';

var templates = [{
  type: 'marker',
  description: 'marker',
  group: 'shape', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'marker',
    left: 125,
    top: 100,
    width: 50,
    height: 100,
    fontColor: '#000000',
    fillStyle: '#333333',
    strokeStyle: '#000000',
    innerCircleFillStyle: '#ffffff',
    lineWidth: 0,
    alpha: 1,
  }
}];

export default {
  templates
};
