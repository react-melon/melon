/**
 * @file Toggle单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Toggle from '../../src/Toggle';

describe('Toggle', () => {

    it('work', done => {
        let component = TestUtils.renderIntoDocument(<Toggle />);

        expect(TestUtils.isCompositeComponent(component)).toBe(true);

        const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        expect(input.value).toBe('');
        expect(input.checked).toBe(false);

        input.checked = true;
        TestUtils.Simulate.change(input);

        then(() => {
            expect(input.checked).toBe(true);
            expect(input.value).toBe('on');
            done();
        });
    });

    it('disabled', done => {
        let component = TestUtils.renderIntoDocument(<Toggle disabled={true} />);

        const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        input.checked = true;
        TestUtils.Simulate.change(input);

        then(() => {
            expect(input.checked).toBe(false);
            expect(input.value).toBe('');
            done();
        });
    });

});

