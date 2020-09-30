import icon from './assets/compass.png';

var templates = [{
  type: 'compass',
  description: 'compass',
  group: 'etc', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'compass',
    cx: 150,
    cy: 150,
    rx: 50,
    ry: 50,
    value: 0,
    fontSize: 20,
    fontColoe: '#000',
    fillStyle: '#F2F2F2',
    strokeStyle: '#AAAAAA',
    lineWidth: 10,
    fontColor: '#ff0000',
    alpha: 1
  }
}];

export default {
  templates
};
