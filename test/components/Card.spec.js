/**
 * @file Card单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/Card';

describe('Card', function () {

    it('work', function () {
        const wrapper = shallow(<Card>test</Card>);
        expect(wrapper.hasClass('ui-card')).toBe(true);
        expect(wrapper.text()).toBe('test');
        // let actualElement = renderer.getRenderOutput();
        // let expectedElement = (
        //     <div className={'ui-card'}>test</div>
        // );
        // expect(actualElement).toEqualJSX(expectedElement);
    });

});
