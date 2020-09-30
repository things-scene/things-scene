/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import '../util'

import * as Const from '../../../src/const'
import { RootContainer, Component } from '../../../src/components'

import { expect } from 'chai'

describe('(root-container) id, alias indexing', function () {
  const DELAY = 1000;

  var root;
  var component;

  beforeEach(function () {
    root = new RootContainer()
    component = new Component({})

    component.set('id', 'TEST-01')
    component.set('alias', ['ALIAS-01', 'ALIAS-02'])
  });

  it('컴포넌트가 add 될때, id나 alias가 정의되어 있으면 인덱스가 추가되어야 한다.', function () {

    root.addComponent(component)

    expect(Const.MODE_VIEW).to.equal(0);

    expect(root.findById('TEST-01')).to.equal(component)
    expect(root.findById('ALIAS-01')).to.equal(component)
    expect(root.findById('ALIAS-02')).to.equal(component)

  });

  it('컴포넌트가 add 될 때, alias는 Array이어야 한다.', function () {

    expect(Const.MODE_VIEW).to.equal(0);
  });

  it('컴포넌트가 remove 될 때, id나 alias가 정의되어 있으면 인덱스에서 제거되어야 한다.', function () {

    root.addComponent(component)

    expect(root.findById('TEST-01')).to.equal(component)
    expect(root.findById('ALIAS-01')).to.equal(component)
    expect(root.findById('ALIAS-02')).to.equal(component)

    root.removeComponent(component)

    expect(root.findById('TEST-01')).to.equal(undefined)
    expect(root.findById('ALIAS-01')).to.equal(undefined)
    expect(root.findById('ALIAS-02')).to.equal(undefined)

  });

  it('컴포넌트의 id나 alias가 변경되면, 변경전 id와 alias는 제거되고, 변경후 id와 alias가 인덱스에 추가되어야 한다.', function () {

    root.addComponent(component)

    expect(root.findById('TEST-01')).to.equal(component)
    expect(root.findById('ALIAS-01')).to.equal(component)
    expect(root.findById('ALIAS-02')).to.equal(component)

    component.set('id', 'TEST-02')

    expect(root.findById('TEST-01')).to.equal(undefined)
    expect(root.findById('TEST-02')).to.equal(component)

  });
});
