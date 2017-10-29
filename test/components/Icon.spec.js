/**
 * @file Icon单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';

import Icon from '../../src/Icon';

describe('Icon', function () {

    it('work', function () {
        const wrapper = shallow(<Icon icon={'hello'} />);
        expect(wrapper.prop('data-icon')).toBe('hello');
        expect(wrapper.hasClass('ui-icon')).toBe(true);
        // let actualElement = renderer.getRenderOutput();
        // let expectedElement = (
        //     <i data-icon={'hello'} className={'ui-icon'}/>
        // );
        // expect(actualElement).toEqualJSX(expectedElement);
    });

});
