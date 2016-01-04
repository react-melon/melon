/**
 * @file Breadcrumb单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import Breadcrumb from '../../src/Breadcrumb';

const {Item} = Breadcrumb;

expect.extend(expectJSX);


describe('Breadcrumb', function () {

    it('work', function () {
        const renderer = createRenderer();
        renderer.render(
            <Breadcrumb>
                <Item>crumb1</Item>
                <Item>crumb2</Item>
            </Breadcrumb>
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div className={'ui-breadcrumb'}>
                <Item level={0}>crumb1</Item>
                <Item level={1}>crumb2</Item>
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


    it('Item', function () {
        const renderer = createRenderer();
        renderer.render(
            <Item href="#" level={1}>crumb1</Item>
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <a level={1} href="#" className={'ui-breadcrumb-item'}>crumb1</a>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


});
