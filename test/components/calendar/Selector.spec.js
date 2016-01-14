/**
 * @file CalendarSelector单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import CalendarSelector from '../../../src/calendar/Selector';
import CalendarSelectorItem from '../../../src/calendar/SelectorItem';
import then from '../../then';

describe('CalendarSelector', function () {

    let component;
    const date = new Date(2016, 0, 12);

    it('mode month', function () {

        component = TestUtils.renderIntoDocument(
            <CalendarSelector
                date={date}
                mode="month"
                minDate={new Date(2016, 0, 3)}
                maxDate={new Date(2016, 9, 1)} />
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        const months = TestUtils.scryRenderedComponentsWithType(component, CalendarSelectorItem);
        expect(months.length).toBe(12);

        const disabledMonth = months.filter(month => month.props.disabled);
        expect(disabledMonth.length).toBe(2);

        component.componentDidUpdate();

    });

    it('mode year', function () {

        component = TestUtils.renderIntoDocument(
            <CalendarSelector
                date={date}
                mode="year"
                minDate={new Date(2013, 0, 3)}
                maxDate={new Date(2016, 9, 1)} />
        );

        const years = TestUtils.scryRenderedComponentsWithType(component, CalendarSelectorItem);
        expect(years.length).toBe(4);

    });

    it('onlyOneyear', function () {

        component = TestUtils.renderIntoDocument(
            <CalendarSelector
                date={date}
                mode="year"
                minDate={new Date(2016, 0, 3)}
                maxDate={new Date(2016, 9, 1)} />
        );

        const months = TestUtils.scryRenderedComponentsWithType(component, CalendarSelectorItem);
        expect(months.length).toBe(12);

    });

    it('click', done => {

        const spy = expect.createSpy();

        component = TestUtils.renderIntoDocument(
            <CalendarSelector
                date={date}
                onChange={spy}
                mode="year" />
        );

        const years = TestUtils.scryRenderedComponentsWithType(component, CalendarSelectorItem);
        expect(years.length).toBe(CalendarSelector.MAX_RANGE * 2);

        TestUtils.Simulate.click(ReactDOM.findDOMNode(years[0]));

        then(() => {
            expect(spy.calls.length).toBe(1);
            expect(spy.calls[0].arguments[0].date.getFullYear()).toBe(2006);

            done();
        });


    });

});
