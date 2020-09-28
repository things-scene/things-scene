/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Form } from '../../src/index'

describe('Form', function() {
  var board

  beforeEach(function() {
    board = scene.create({
      model: {
        components: [
          {
            id: 'form',
            type: 'form'
          }
        ]
      }
    })
  })

  it('component should be found by its id.', function() {
    var component = board.findById('form')

    expect(!!component).not.to.equal(false)
  })
})
