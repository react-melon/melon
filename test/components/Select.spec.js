/**
 * @file Select单测
 * @author cxtom(cxtom2010@gmail.com)
 */


import expect from 'expect';
// import expectJSX from 'expect-jsx';

// import SeparatePopup from '../../src/select/SeparatePopup';
// import createInputComponent from '../../src/createInputComponent';

// require('react/lib/ExecutionEnvironment').canUseDOM = true;

describe('Select', function () {

    let container;

    const Form = require('../../src/Form');
    const Select = require('../../src/Select');
    const React = require('react');
    const ReactDOM = require('react-dom');
    const TestUtils = require('react-addons-test-utils');

    var datasource = [
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

            getInitialState() {
                return {
                    a: '1'
                };
            },

            componentDidMount() {
                select = this.refs.form.fields[0].child;
                element = document.querySelector('.ui-select');

                expect(select.props.value).toBe('1');
                expect(select.isOpen()).toBe(false);

                TestUtils.Simulate.click(element);

                setTimeout(() => {
                    expect(select.isOpen()).toBe(true);
                    select.onClickOption({
                        target: document.querySelectorAll('.ui-select-option')[2]
                    });
                    this.onClickOption();
                }, 0);
            },

            onClickOption() {
                expect(select.isOpen()).toBe(false);
                expect(select.props.value).toBe('3');
                done();
            },

            render() {

                return (
                    <Form ref="form">
                        <Select name="a" defaultValue={this.state.a}>
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
