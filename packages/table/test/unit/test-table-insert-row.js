/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Table } from '../../src/index'

describe('Table - 행 추가하기', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'table',
          type: 'table',
          rows: 2,
          columns: 2
        }]
      }
    })
  });

  it('첫 번째 셀 위에 행을 추가하면, rows 값이 하나 증가해야한다.', function () {

    var table = board.findById('table')

    var rows = table.get('rows')

    var cell = table.components[0]
    table.insertCellsAbove([cell])

    expect(table.get('rows')).to.equal(rows + 1)
  });

  it('첫 번째 셀 위에 행을 추가하면, 첫 번째 셀의 인덱스는 열의 수만큼 증가해야한다.', function(){

    var table = board.findById('table');

    var cell = table.components[0];

    var beforeIndex = table.components.indexOf(cell);

    table.insertCellsAbove([cell]);

    var afterIndex = table.components.indexOf(cell);

    expect(afterIndex).to.equal(beforeIndex + table.columns);
  });

  it('첫 번째 셀 아래에 행을 추가하면, rows 값이 하나 증가해야 한다.', function() {
    var table = board.findById('table')

    var rows = table.get('rows')

    var cell = table.components[0]
    table.insertCellsBelow([cell])

    expect(table.get('rows')).to.equal(rows + 1)
  });

  it('첫 번째 셀 아래에 행을 추가하면, 첫 번째 셀의 인덱스는 변하지 않아야 한다.', function() {
    var table = board.findById('table');

    var cell = table.components[0];

    var beforeIndex = table.components.indexOf(cell);

    table.insertCellsBelow([cell]);

    var afterIndex = table.components.indexOf(cell);

    expect(afterIndex).to.equal(beforeIndex);
  });
});
