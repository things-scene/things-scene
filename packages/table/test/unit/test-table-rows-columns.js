/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Table } from '../../src/index'

describe('Table - Rows, Columns', function () {

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

  it('생성시 테이블 셀의 갯수는 테이블의 rows * columns 와 같아야 한다.', function () {

    var table = board.findById('table')

    expect(table.components.length).to.equal(4)
  });

  it('rows와 columns값을 새로 설정할 경우 테이블 셀의 갯수는 테이블의 새로운 rows * columns 와 같아야 한다.', function () {

    var table = board.findById('table')

    table.set({
      rows: 5,
      columns: 5
    })

    expect(table.components.length).to.equal(25)
  });

});
