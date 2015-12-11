/**
 * @file Select单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import then from '../then';

// import SeparatePopup from '../../src/select/SeparatePopup';
// import createInputComponent from '../../src/createInputComponent';

describe('Select', function () {

    let container;

    const Form = require('../../src/Form');
    const Select = require('../../src/Select');

    const datasource = [
        {value: '1', name: 'Never'},
        {value: '2', name: 'Every Night'},
        {value: '3', name: 'Weeknights'},
        {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
        {value: '5', name: 'Weekly', disabled: true}
    ];

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(function () {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('Select', done => {

        let select;
        let element;

        const TestComponent = React.createClass({

            componentDidMount() {
                select = this.refs.form.fields[0].child;
                element = document.querySelector('.ui-select');

                expect(select.props.value).toBe('1');
                expect(select.isOpen()).toBe(false);

                TestUtils.Simulate.click(element);

                then(() => {
                    expect(select.isOpen()).toBe(true);
                    TestUtils.Simulate.click(element);
                })
                .then(() => {
                    expect(select.isOpen()).toBe(false);
                    const option = document.querySelectorAll('.ui-select-option')[2];
                    TestUtils.Simulate.click(option);
                })
                .then(() => {
                    expect(select.isOpen()).toBe(false);
                    expect(select.props.value).toBe('3');

                    const option = document.querySelectorAll('.ui-select-option')[4];
                    TestUtils.Simulate.click(option);
                })
                .then(() => {
                    expect(select.props.value).toBe('3');
                    done();
                });
            },

            render() {

                return (
                    <Form ref="form">
                        <Select name="a" defaultValue="1">
                            <optgroup label="1">
                                {Select.createOptions(datasource)}
                            </optgroup>
                            <option label="others" value="0" />
                        </Select>
                    </Form>
                );
            }
        });

        ReactDOM.render(<TestComponent />, container);
    });

});
