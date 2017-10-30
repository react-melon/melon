/**
 * @file Title单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import Title from '../../src/Title';

describe('Title', function () {

    it('work h1', function () {
        let wrapper = shallow(<Title>title</Title>);
        expect(wrapper.is('h1')).toBe(true);
        expect(wrapper.hasClass('ui-title')).toBe(true);
        expect(wrapper.text()).toBe('title');
    });

    it('work h2', function () {
        let wrapper = shallow(<Title level={2}>title</Title>);
        expect(wrapper.is('h2')).toBe(true);
    });

});
