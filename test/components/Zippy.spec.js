/**
 * @file Zippy单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import then from '../then';

import Zippy from '../../src/Zippy';

describe('Zippy', () => {

    it('horizontal / vertical', () => {
        let wrapper = shallow(<Zippy><p>test</p></Zippy>);
        expect(wrapper.hasClass('variant-vertical')).toBe(true);
        wrapper.setProps({direction: 'horizontal'});
        expect(wrapper.hasClass('variant-horizontal')).toBe(true);
    });

    it('expand', done => {

        let wrapper = shallow(
            <Zippy expand={false} size={10}>
                <p>test</p>
            </Zippy>
        );

        expect(wrapper.hasClass('state-close')).toBe(true);

        wrapper.setProps({expand: true});

        then(() => {
            expect(wrapper.hasClass('state-close')).toBe(false);
            done();
        });

    });

});
