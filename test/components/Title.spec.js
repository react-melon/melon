/**
 * @file Title单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import Title from '../../src/Title';

expect.extend(expectJSX);

describe('Title', function () {

    let renderer;

    beforeEach(function () {
        renderer = createRenderer();
    });

    afterEach(function () {
        renderer = null;
    });

    it('work h1', function () {
        renderer.render(<Title>title1</Title>);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <h1 className="ui-title">title1</h1>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('work h2', function () {
        renderer.render(<Title level={2}>title1</Title>);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <h2 className="ui-title">title1</h2>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
