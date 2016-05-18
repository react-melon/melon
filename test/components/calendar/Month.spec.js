/**
 * @file CalendarMonth单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import CalendarMonth from '../../../src/calendar/Month';
import CalendarDay from '../../../src/calendar/Day';
import Calendar from '../../../src/Calendar';
import then from '../../then';

describe('CalendarMonth', function () {

    let component;
    const date = new Date(2016, 0, 12);
    const month = new Date(2016, 0, 1);

    it('dom', () => {

        component = TestUtils.renderIntoDocument(
            <CalendarMonth
                date={date}
                month={month}
                lang={Calendar.LANG} />
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);

        const weekheader = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-calendar-month-weekheader');
        expect(weekheader.childNodes.length).toBe(7);

        const main = TestUtils.findRenderedDOMComponentWithTag(component, 'ul');
        expect(main.childNodes.length).toBe(6);

        const days = TestUtils.scryRenderedComponentsWithType(component, CalendarDay);
        expect(days.length).toBe(42);

        const daysInMonth = days.reduce((result, day) => {

            let variants = day.props.variants;

            if (variants) {
                result[variants === 'next-month' ? 'next' : 'pre'].push(day);
            }

            return result;

        }, {
            pre: [],
            next: []
        });

        expect(daysInMonth.pre.length).toBe(5);
        expect(daysInMonth.next.length).toBe(6);

    });

    it('minDate maxDate', () => {

        component = TestUtils.renderIntoDocument(
            <CalendarMonth
                date={date}
                month={month}
                lang={Calendar.LANG}
                minDate={new Date(2016, 0, 3)}
                maxDate={new Date(2016, 0, 18)} />
        );

        const days = TestUtils.scryRenderedComponentsWithType(component, CalendarDay);

        const daysInMonth = days.reduce((result, day) => {

            let {
                disabled,
                selected
            } = day.props;

            if (disabled) {
                result.disabled.push(day);
            }

            if (selected) {
                result.selected.push(day);
            }

            return result;

        }, {
            disabled: [],
            selected: []
        });

        expect(daysInMonth.disabled.length).toBe(26);
        expect(daysInMonth.selected.length).toBe(1);
        expect(daysInMonth.selected[0].props.date.getDate()).toBe(12);

    });

    it('click', done => {

        const spy = expect.createSpy();

        component = TestUtils.renderIntoDocument(
            <CalendarMonth
                date={date}
                month={month}
                onChange={spy}
                lang={Calendar.LANG} />
        );

        const days = TestUtils.scryRenderedComponentsWithType(component, CalendarDay);

        TestUtils.Simulate.click(ReactDOM.findDOMNode(days[5]));

        then(() => {
            expect(spy.calls.length).toBe(1);
            expect(spy.calls[0].arguments[0]).toEqual({
                target: component,
                date: new Date(2016, 0, 1)
            });

            done();
        });

    });

});
