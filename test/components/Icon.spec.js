/**
 * @file Icon单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import Icon from '../../src/Icon';

expect.extend(expectJSX);


describe('Icon', function () {

    it('work', function () {
        const renderer = createRenderer();
        renderer.render(
            <Icon icon={'hello'} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <i data-icon={'hello'} className={'ui-icon'}/>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
