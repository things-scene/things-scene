/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Restful } from '../../src/index'

describe('Restful', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'restful',
          type: 'restful'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('restful')

    expect(!!component).not.to.equal(false);
  });
});
