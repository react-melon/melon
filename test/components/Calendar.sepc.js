/**
 * @file Calendar单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
// import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Calendar from '../../src/Calendar';
import Confirm from '../../src/dialog/Confirm';
import CalendarPanel from '../../src/calendar/Panel';
import {InputComponent} from '../../src/createInputComponent';

/* eslint-disable max-nested-callbacks */

describe('Calendar', () => {

    let component;
    let calendar;
    let child;

    describe('basic', () => {

        beforeEach(() => {

            component = TestUtils.renderIntoDocument(
                <Calendar defaultValue="2016-01-13" />
            );

            calendar = TestUtils.findRenderedComponentWithType(component, InputComponent);
            child = calendar.child;

        });

        afterEach(() => {
            component = calendar = child = null;
        });

        it('work', done => {

            expect(TestUtils.isCompositeComponent(component)).toBe(true);

            expect(child.state.date.getDate()).toBe(13);
            expect(child.state.date.getMonth()).toBe(0);
            expect(child.state.date.getFullYear()).toBe(2016);
            expect(child.state.open).toBe(false);

            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(component, 'label'));

            then(() => {
                expect(child.state.open).toBe(true);
                done();
            });
        });

        it('onDateChange', done => {

            const date = new Date(2014, 5, 12);

            const panel = TestUtils.findRenderedComponentWithType(child, CalendarPanel);
            expect(TestUtils.isCompositeComponent(panel)).toBe(true);

            panel.onDateChange({date});

            then(() => {
                expect(child.state.date.getDate()).toBe(12);
                expect(child.state.date.getMonth()).toBe(5);
                expect(child.state.date.getFullYear()).toBe(2014);
                done();
            });

        });

        it('onConfirm', done => {

            const date = new Date(2014, 5, 12);

            const panel = TestUtils.findRenderedComponentWithType(child, CalendarPanel);
            const confirm = TestUtils.findRenderedComponentWithType(child, Confirm);
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(component, 'label'));
            panel.onDateChange({date});

            then(() => {
                confirm.onConfirmSubmit(true);
            })
            .then(() => {
                expect(child.props.value).toBe('2014-06-12');
                expect(child.state.open).toBe(false);
                done();
            });

        });

        it('onCancel', done => {

            const date = new Date(2014, 5, 12);

            const panel = TestUtils.findRenderedComponentWithType(child, CalendarPanel);
            const confirm = TestUtils.findRenderedComponentWithType(child, Confirm);
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(component, 'label'));
            panel.onDateChange({date});

            then(() => {
                confirm.onConfirmSubmit(false);
            })
            .then(() => {
                expect(child.props.value).toBe('2016-01-13');
                expect(child.state.open).toBe(false);
                done();
            });

        });

    });

    it('autoConfirm', done => {
        const spy = expect.createSpy();
        component = TestUtils.renderIntoDocument(
            <Calendar
                value="2016-01-13"
                onChange={spy}
                autoConfirm />
        );
        calendar = TestUtils.findRenderedComponentWithType(component, InputComponent);
        child = calendar.child;

        const date = new Date(2014, 5, 12);
        const panel = TestUtils.findRenderedComponentWithType(component, CalendarPanel);
        panel.onDateChange({date});

        then(() => {
            calendar.setState({value: '2014-06-12'});
        })
        .then(() => {
            expect(spy.calls.length).toBe(1);
            expect(child.props.value).toBe('2014-06-12');
            panel.onDateChange({date});
        })
        .then(() => {
            expect(spy.calls.length).toBe(1);
            done();
        });

    });

});

