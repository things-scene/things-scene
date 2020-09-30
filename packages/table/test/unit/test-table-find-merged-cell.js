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
          rows: 5,
          columns: 10
        }]
      }
    })
  });

  it('첫 번째 행에서 합쳐진 셀이 없으면 리턴 값의 길이는 0이어야 한다', function () {

    var table = board.findById('table')

    var mergedCells = table.findMergedCellByX(0)

    expect(mergedCells.length).to.equal(0);
  });

  it('첫 번째 행에서 합쳐진 셀이 2개 있으면 리턴 값의 길이는 2이어야 한다', function () {

    var table = board.findById('table');

    table.components[1].merged = true;
    table.components[2].set('merged', true);

    var mergedCells = table.findMergedCellByX(0);

    expect(mergedCells.length).to.equal(2);
  });

  it('첫 번째 행에서 합쳐진 셀이 행을 전부 포함하고 있으면 리턴 값의 길이는 테이블의 columns 이어야 한다', function () {

    var table = board.findById('table');

    table.components.forEach((cell) => {
      cell.merged = true;
    });

    var mergedCells = table.findMergedCellByX(0);

    expect(mergedCells.length).to.equal(table.columns);
  });

  it('첫 번째 열에서 합쳐진 셀이 없으면 리턴 값의 길이는 0이어야 한다', function () {

    var table = board.findById('table')

    var mergedCells = table.findMergedCellByY(0)

    expect(mergedCells.length).to.equal(0);
  });

  it('첫 번째 열에서 합쳐진 셀이 2개 있으면 리턴 값의 길이는 2이어야 한다', function () {

    var table = board.findById('table');

    table.components[0].merged = true;
    table.components[table.columns].set('merged', true);

    var mergedCells = table.findMergedCellByY(0);

    expect(mergedCells.length).to.equal(2);
  });

  it('첫 번째 행에서 합쳐진 셀이 행을 전부 포함하고 있으면 리턴 값의 길이는 테이블의 rows 이어야 한다', function () {

    var table = board.findById('table');

    table.components.forEach((cell) => {
      cell.merged = true;
    });

    var mergedCells = table.findMergedCellByY(0);

    expect(mergedCells.length).to.equal(table.rows);
  });
});
