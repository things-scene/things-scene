/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Table } from '../../src/index'

describe('Table - 열 추가하기', function () {

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

  it('첫 번째 셀의 왼쪽에 컬럼을 추가하면, columns 값이 하나 증가해야한다.', function () {

    var table = board.findById('table')

    var columns = table.get('columns')

    var cell = table.components[0]
    table.insertCellsLeft([cell])

    expect(table.get('columns')).to.equal(columns + 1)
  });

  it('insertCellsLeft 하면 선택한 셀의 인덱스 값이 하나 증가해야한다.', function() {

    var table = board.findById('table');

    var cell = table.components[0];

    var beforeIndex = table.components.indexOf(cell);

    table.insertCellsLeft([cell]);

    var afterIndex =  table.components.indexOf(cell);

    expect(afterIndex).to.equal(beforeIndex + 1);
  });

  it('첫 번째 셀의 오른쪽에 컬럼을 추가하면, columns 값이 하나 증가해야한다.', function(){

    var table = board.findById('table');

    var columns = table.get('columns');

    var cell = table.components[0];
    table.insertCellsRight([cell]);

    expect(table.get('columns')).to.equal(columns + 1);
  });

  it('insertCellsRight 하면 선택한 셀의 인덱스 값이 증가하면 안된다.', function(){

    var table = board.findById('table');

    var cell = table.components[0];

    var beforeIndex = table.components.indexOf(cell);

    table.insertCellsRight([cell]);

    var afterIndex = table.components.indexOf(cell);

    expect(afterIndex).to.equal(beforeIndex);
  });
});
