/**
 * @file CalendarPager单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Icon from '../../../src/Icon';
import CalendarPager from '../../../src/calendar/Pager';
import then from '../../then';


expect.extend(expectJSX);

describe('CalendarPager', function () {

    it('work', function () {
        const renderer = TestUtils.createRenderer();
        const date = new Date(2016, 11, 1);
        renderer.render(
            <CalendarPager month={date} />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <div className={'ui-calendar-pager'}>
                <Icon
                    className="ui-calendar-pager-prev"
                    icon="navigate-before"
                    data-role="pager"
                    data-action="prev"
                    onClick={() => {}} />
                <Icon
                    className="ui-calendar-pager-next"
                    icon="navigate-next"
                    data-role="pager"
                    data-action="next"
                    onClick={() => {}} />
                2016 年 12 月
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


    it('minDate', function () {
        const renderer = TestUtils.createRenderer();
        const date = new Date(2015, 10, 1);
        renderer.render(
            <CalendarPager month={date} minDate={new Date(2015, 11, 1)} />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <div className={'ui-calendar-pager'}>
                <Icon
                    icon="navigate-before"
                    data-role="pager"
                    className="ui-calendar-pager-prev state-disabled"
                    data-action="prev"
                    onClick={null} />
                <Icon
                    icon="navigate-next"
                    data-role="pager"
                    data-action="next"
                    className="ui-calendar-pager-next"
                    onClick={() => {}} />
                2015 年 11 月
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


    it('maxDate', function () {
        const renderer = TestUtils.createRenderer();
        const date = new Date(2015, 10, 1);
        renderer.render(
            <CalendarPager month={date} maxDate={new Date(2015, 9, 1)} />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <div className={'ui-calendar-pager'}>
                <Icon
                    icon="navigate-before"
                    className="ui-calendar-pager-prev"
                    data-role="pager"
                    data-action="prev"
                    onClick={() => {}} />
                <Icon
                    icon="navigate-next"
                    data-role="pager"
                    className="ui-calendar-pager-next state-disabled"
                    data-action="next"
                    onClick={null} />
                2015 年 11 月
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


    it('click', done => {

        const spy = expect.createSpy();
        const date = new Date(2015, 10, 1);

        const component = TestUtils.renderIntoDocument(<CalendarPager month={date} onChange={spy} />);
        const icons = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-icon');

        // 上一月
        TestUtils.Simulate.click(icons[0]);

        /* eslint-disable fecs-no-arguments */
        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({target: component, month: new Date(2015, 9, 1)});

            // 下一月
            TestUtils.Simulate.click(icons[1]);
        })
        .then(() => {
            expect(spy.calls.length).toBe(2);
            expect(spy.calls[1].arguments[0]).toEqual({target: component, month: new Date(2015, 11, 1)});

            done();
        });
        /* eslint-enable fecs-no-arguments */

    });

});
