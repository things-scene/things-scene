/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Firebase } from '../../src/index'

describe('Firebase', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'firebase',
          type: 'firebase'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('firebase')

    expect(!!component).not.to.equal(false);
  });
});
