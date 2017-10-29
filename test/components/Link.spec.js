/**
 * @file Link单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import Link from '../../src/Link';

describe('Link', function () {

    it('work', function () {
        let wrapper = shallow(<Link>link</Link>);
        expect(wrapper.hasClass('ui-link')).toBe(true);
        expect(wrapper.text()).toBe('link');
    });

});
