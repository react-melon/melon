/**
 * @file TextBox单测
 * @author cxtom(cxtom2008@gmail.com)
 */

/* globals before */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils, {createRenderer} from 'react-addons-test-utils';

import TextBox from '../../src/TextBox';
import Input from '../../src/textbox/Input';
import FloatLabel from '../../src/textbox/FloatLabel';
import then from '../then';

expect.extend(expectJSX);

/* eslint-disable max-nested-callbacks */

describe('TextBox', function () {

    describe('dom', () => {

        let renderer;

        beforeEach(() => {
            renderer = createRenderer();
        });

        it('Input', function () {

            renderer.render(
                <Input isFocus={true} rows={10} />
            );

            let actualElement = renderer.getRenderOutput();
            let expectedElement = (
                <input rows={null} className={'ui-text-box-input state-focus'} />
            );

            expect(actualElement).toEqualJSX(expectedElement);
        });

        it('Input multiline', function () {

            renderer.render(
                <Input multiline={true} rows={10}>test</Input>
            );

            let actualElement = renderer.getRenderOutput();
            let expectedElement = (
                <textarea className={'ui-text-box-input'} rows={10}>test</textarea>
            );

            expect(actualElement).toEqualJSX(expectedElement);
        });

        it('FloatLabel', function () {

            renderer.render(
                <FloatLabel
                    focused={true}
                    floating={true}
                    label={'test'}>
                    haha
                </FloatLabel>
            );

            let actualElement = renderer.getRenderOutput();
            let expectedElement = (
                <label className={'ui-text-box-floating-label state-focus state-floating'}>
                    test
                </label>
            );

            expect(actualElement).toEqualJSX(expectedElement);
        });
    });

    describe('work', () => {

        let textbox;
        let spy = expect.createSpy();

        before(() => {

            textbox = TestUtils.renderIntoDocument(
                <TextBox
                    floatingLabel="floating"
                    defaultValue="haha"
                    onFocus={spy}
                    onBlur={spy}
                    name="haha" />
            );


        });

        it('init', () => {

            expect(TestUtils.isCompositeComponent(textbox)).toBe(true);

            expect(textbox.state).toInclude({
                isFloating: true,
                isFocus: false,
                value: 'haha'
            });

            expect(textbox.getValue()).toBe('haha');

        });

        it('focus', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(textbox, 'input');
            TestUtils.Simulate.focus(input);

            then(() => {

                expect(textbox.state).toInclude({
                    isFloating: true,
                    isFocus: true,
                    value: 'haha'
                });

                expect(spy.calls.length).toEqual(1);
                expect(spy.calls[0].arguments).toInclude({
                    type: 'focus',
                    target: textbox
                });

                done();
            });

        });


        it('change', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(textbox, 'input');
            input.value = 'aaa';
            TestUtils.Simulate.change(input);

            then(() => {
                expect(textbox.getValue()).toBe('aaa');
                done();
            });

        });


        it('blur', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(textbox, 'input');
            input.value = '';
            TestUtils.Simulate.change(input);

            then(() => {
                expect(textbox.getValue()).toBe('');
                TestUtils.Simulate.blur(input);
            })
            .then(() => {

                expect(textbox.state).toInclude({
                    isFloating: false,
                    isFocus: false,
                    value: ''
                });

                expect(spy.calls.length).toEqual(2);
                expect(spy.calls[1].arguments).toInclude({
                    type: 'blur',
                    target: textbox
                });

                done();
            });

        });
    });

    describe('multiline & controled', () => {

        let textbox;
        let test;

        const TestComponent = React.createClass({

            getInitialState() {
                return {
                    value: 'haha'
                };
            },

            onChange(e) {
                this.setState({value: e.value});
            },

            render() {
                return (
                    <TextBox
                        floatingLabel="floating"
                        value={this.state.value}
                        onChange={this.onChange}
                        style={{width: 10}}
                        multiline={true}
                        name="haha" />
                );
            }
        });

        before(() => {
            test = TestUtils.renderIntoDocument(<TestComponent />);
            textbox = TestUtils.findRenderedComponentWithType(test, TextBox);
        });

        it('init', () => {
            expect(TestUtils.isCompositeComponent(textbox)).toBe(true);
            expect(textbox.getValue()).toBe('haha');
            expect(textbox.props.value).toBe('haha');
        });

        it('change', () => {

            const textarea = TestUtils.findRenderedDOMComponentWithTag(textbox, 'textarea');
            textarea.value = '';
            TestUtils.Simulate.change(textarea);

            then(() => {
                expect(textbox.getValue()).toBe('');
            });

        });

    });

});
