/**
 * @file Select单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Form from 'melon-core/Form';
import Select from '../../src/Select';
import then from '../then';

describe('Select', function () {

    let container;

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

                select = this.refs.form.fields[0];

                element = document.querySelector('.ui-select');

                expect(select.getValue()).toEqual('1');
                expect(select.isOpen()).toBeFalsy();

                TestUtils.Simulate.click(element);

                then(() => {
                    expect(select.isOpen()).toBeTruthy();
                    TestUtils.Simulate.click(element);
                })
                .then(() => {
                    expect(select.isOpen()).toBeFalsy();
                    const option = document.querySelectorAll('.ui-select-option')[2];
                    TestUtils.Simulate.click(option);
                })
                .then(() => {
                    expect(select.isOpen()).toBeFalsy();
                    expect(select.getValue()).toEqual('3');

                    const option = document.querySelectorAll('.ui-select-option')[4];
                    TestUtils.Simulate.click(option);
                })
                .then(() => {
                    expect(select.getValue()).toEqual('3');
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
