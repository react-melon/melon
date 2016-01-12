/**
 * @file TextBox单测
 * @author cxtom(cxtom2010@gmail.com)
 */

/* globals before */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils, {createRenderer} from 'react-addons-test-utils';

import TextBox from '../../src/TextBox';
import Input from '../../src/textbox/Input';
import FloatLabel from '../../src/textbox/FloatLabel';
import {InputComponent} from '../../src/createInputComponent';
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

        let component;
        let textbox;
        let child;
        let spy = expect.createSpy();

        before(() => {

            component = TestUtils.renderIntoDocument(
                <TextBox
                    floatingLabel="floating"
                    defaultValue="haha"
                    onFocus={spy}
                    onBlur={spy}
                    name="haha" />
            );

            textbox = TestUtils.findRenderedComponentWithType(component, InputComponent);

            child = textbox.child;

        });

        it('init', () => {

            expect(TestUtils.isCompositeComponent(textbox)).toBe(true);
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(TestUtils.isCompositeComponent(child)).toBe(true);

            expect(child.state).toEqual({
                isFloating: true,
                isFocus: false
            });

            expect(textbox.state.value).toBe('haha');
            expect(child.props.value).toBe('haha');

        });

        it('focus', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
            TestUtils.Simulate.focus(input);

            then(() => {

                expect(child.state).toEqual({
                    isFloating: true,
                    isFocus: true
                });

                expect(spy.calls.length).toEqual(1);
                expect(spy.calls[0].arguments).toInclude({
                    type: 'focus',
                    target: child
                });

                done();
            });

        });


        it('change', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
            input.value = 'aaa';
            TestUtils.Simulate.change(input);

            then(() => {

                expect(textbox.state.value).toBe('aaa');
                expect(child.props.value).toBe('aaa');

                done();
            });

        });


        it('blur', done => {

            const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
            input.value = '';
            TestUtils.Simulate.change(input);

            then(() => {
                expect(textbox.state.value).toBe('');
                expect(child.props.value).toBe('');
                TestUtils.Simulate.blur(input);
            })
            .then(() => {

                expect(child.state).toEqual({
                    isFloating: false,
                    isFocus: false
                });

                expect(spy.calls.length).toEqual(2);
                expect(spy.calls[1].arguments).toInclude({
                    type: 'blur',
                    target: child
                });

                done();
            });

        });
    });

    describe('multiline & controled', () => {

        let component;
        let textbox;
        let child;

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

            component = TestUtils.renderIntoDocument(<TestComponent />);

            textbox = TestUtils.findRenderedComponentWithType(component, InputComponent);

            child = textbox.child;

        });

        it('init', () => {

            expect(TestUtils.isCompositeComponent(textbox)).toBe(true);
            expect(TestUtils.isCompositeComponent(child)).toBe(true);

            expect(textbox.state.value).toBe('haha');
            expect(child.props.value).toBe('haha');

        });

        it('change', () => {

            const textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
            textarea.value = '';
            TestUtils.Simulate.change(textarea);

            then(() => {
                expect(textbox.state.value).toBe('');
                expect(child.props.value).toBe('');
            });

        });


        it('syncTextareaHeight', () => {

            const textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
            textarea.value = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            TestUtils.Simulate.change(textarea);

            then(() => {
                expect(textbox.state.value).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                expect(textarea.style.height).toBe(textarea.scrollHeight + 'px');
            });

        });

    });

});
