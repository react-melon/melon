/**
 * @file ToolBar单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';

import ToolBar from '../../src/ToolBar';

describe('ToolBar', function () {

    it('work', function () {
        const renderer = createRenderer();
        renderer.render(
            <ToolBar>test</ToolBar>
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div className={'ui-tool-bar'}>test</div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
