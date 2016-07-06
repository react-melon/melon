/**
 * @file Toggle单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Toggle from '../../src/Toggle';

describe('Toggle', () => {

    it('work', done => {
        let component = TestUtils.renderIntoDocument(<Toggle value="" />);

        expect(TestUtils.isCompositeComponent(component)).toBe(true);

        const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        expect(component.getValue()).toEqual('');

        input.checked = true;
        TestUtils.Simulate.change(input);

        then(() => {
            expect(component.getValue()).toEqual('on');
            done();
        });
    });

    // it('disabled', done => {
    //     let component = TestUtils.renderIntoDocument(<Toggle disabled={true} />);

    //     const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

    //     TestUtils.Simulate.change(input);

    //     then(() => {
    //         expect(component.getValue()).toEqual('');
    //         done();
    //     });
    // });

});

