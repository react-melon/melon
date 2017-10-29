/**
 * @file ToolBar单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import ToolBar from '../../src/ToolBar';

describe('ToolBar', function () {

    it('work', function () {
        const wrapper = shallow(<ToolBar>test</ToolBar>);
        expect(wrapper.hasClass('ui-tool-bar')).toBe(true);
        expect(wrapper.text()).toBe('test');
    });

});
