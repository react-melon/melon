/**
 * @file Select单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import then from '../then';

import {InputComponent} from '../../src/createInputComponent';

describe('Select', function () {

    let component;

    const Select = require('../../src/Select');

    const datasource = [
        {value: '1', name: 'Never'},
        {value: '2', name: 'Every Night'},
        {value: '3', name: 'Weeknights'},
        {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
        {value: '5', name: 'Weekly', disabled: true}
    ];

    it('Select', done => {

        component = TestUtils.renderIntoDocument(
            <Select name="a" defaultValue="6">
                <optgroup label="1">
                    {Select.createOptions(datasource)}
                </optgroup>
                <option label="others" value="6" />
            </Select>
        );
        expect(TestUtils.isCompositeComponent(component)).toBe(true);

        const select = TestUtils.findRenderedComponentWithType(component, InputComponent);
        expect(TestUtils.isCompositeComponent(select)).toBe(true);
        const child = select.child;
        expect(TestUtils.isCompositeComponent(child)).toBe(true);

        let options = document.querySelectorAll('.ui-select-option');
        expect(options.length).toBe(6);

        expect(child.props.value).toBe('6');
        expect(child.isOpen()).toBe(false);

        TestUtils.Simulate.click(ReactDOM.findDOMNode(child));

        then(() => {
            expect(child.isOpen()).toBe(true);
            TestUtils.Simulate.click(ReactDOM.findDOMNode(child));
        })
        .then(() => {
            expect(child.isOpen()).toBe(false);
            const option = options[2];
            TestUtils.Simulate.click(option);
        })
        .then(() => {
            expect(child.isOpen()).toBe(false);
            expect(child.props.value).toBe('3');

            const option = options[4];
            TestUtils.Simulate.click(option);
        })
        .then(() => {
            expect(child.props.value).toBe('3');
            child.componentWillUnmount();
            done();
        });
    });

});
