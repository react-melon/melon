/**
 * @file CalendarPanel单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import CalendarPanel from '../../../src/calendar/Panel';
import Calendar from '../../../src/Calendar';

import then from '../../then';

describe('CalendarPanel', function () {

    let component;
    let header;
    let spy = expect.createSpy();

    const date = new Date(2016, 0, 12);

    beforeEach(() => {

        component = TestUtils.renderIntoDocument(
            <CalendarPanel
                date={date}
                lang={Calendar.LANG}
                onChange={spy}
                begin={new Date(2013, 0, 3)}
                end={new Date(2016, 11, 1)} />
        );

        header = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-calendar-header');
    });

    it('work', function () {

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(TestUtils.isDOMComponent(header)).toBe(true);
        expect(component.state).toEqual({date, month: date, selectorType: 'main'});

    });

    it('change selectorType', done => {

        TestUtils.Simulate.click(header);

        then(() => {
            expect(component.state.selectorType).toEqual('year');
            TestUtils.Simulate.click(header);
        })
        .then(() => {
            expect(component.state.selectorType).toEqual('main');
            done();
        });
    });

    it('willReceiveProps', done => {

        component.componentWillReceiveProps({date: new Date(2016, 1, 13)});

        then(() => {
            expect(component.state.date.getDate()).toEqual(13);
            expect(component.state.month.getMonth()).toEqual(1);
            done();
        });
    });

    it('onDateChange', done => {

        component.onDateChange({date: new Date(2016, 1, 16)});

        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0].value.getDate()).toBe(16);
            done();
        });
    });

    it('onPagerChange', done => {

        component.onPagerChange({month: new Date(2016, 2, 16)});

        then(() => {
            expect(component.state.month.getMonth()).toEqual(2);
            done();
        });
    });

    it('onSelectorChange', done => {

        component.onSelectorChange({date: new Date(2015, 2, 16), mode: 'year'});

        then(() => {
            expect(component.state.month.getFullYear()).toEqual(2015);
            expect(component.state.selectorType).toEqual('month');
            component.onSelectorChange({date: new Date(2015, 5, 16), mode: 'month'});
        })
        .then(() => {
            expect(component.state.month.getMonth()).toEqual(5);
            expect(component.state.selectorType).toEqual('main');
            done();
        });
    });


});
