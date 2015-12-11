/**
 * @file Form单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';

import Form from '../../src/Form';
import Button from '../../src/Button';
import validator from '../../src/Validator';
import TextBox from '../../src/TextBox';

expect.extend(expectJSX);

describe('Form', () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('dom', () => {
        let renderer = TestUtils.createRenderer();
        renderer.render(
            <Form />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <form onSubmit={function noRefCheck() {}} validator={validator}></form>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('functions', done => {

        let component;
        let spy = expect.createSpy();

        const TestComponent = React.createClass({

            getInitialState() {

                component = this;

                return {
                    showText2: true
                };
            },

            render() {

                return (
                    <Form ref="form" onSubmit={spy}>
                        <TextBox
                            name="textbox1"
                            defaultValue="1"
                            rules={{required: true}} />
                        {this.state.showText2 ? (
                            <TextBox
                                name="textbox2"
                                defaultValue=""
                                rules={{required: true, requiredErrorMessage: 'test'}} />
                        ) : null}
                        <TextBox
                            name="textbox3"
                            defaultValue="3"
                            disabled={true}
                            rules={{required: true}} />
                        <Button type="submit">submit</Button>
                    </Form>
                );
            }
        });

        ReactDOM.render(<TestComponent />, container, () => {

            const {form} = component.refs;
            expect(form.fields.length).toBe(3);
            expect(form.getData()).toEqual({
                textbox1: '1',
                textbox2: ''
            });

            let check = form.checkValidity();

            expect(check.isValid).toBe(false);
            expect(check.errors.length).toBe(1);
            expect(form.fields[1].state.validity.getMessage()).toBe('test');
            expect(form.validate()).toBe(false);

            const node = document.getElementsByTagName('form')[0];
            TestUtils.Simulate.submit(node);

            expect(spy.calls.length).toEqual(0);

            component.setState({showText2: false}, () => {
                expect(form.fields.length).toBe(2);
                expect(form.isValidFormField(form.fields[0])).toBe(true);

                expect(form.getData()).toEqual({
                    textbox1: '1'
                });

                TestUtils.Simulate.submit(node);

                expect(spy.calls.length).toEqual(1);
                done();
            });

        });
    });

});
