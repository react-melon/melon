/**
 * @file CalendarDay 单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import ReactDOM from 'react-dom';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';

import CalendarDay from '../../../src/calendar/Day';
import then from '../../then';
import * as dateUtil from '../../../src/common/util/date';

expect.extend(expectJSX);

describe('CalendarDay', function () {

    let renderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
    });

    it('dom work', function () {

        const date = dateUtil.addDays(new Date(), -1);
        renderer.render(
            <CalendarDay date={date} />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <a
                className="ui-calendar-day"
                href="#"
                onClick={() => {}} >
                {date.getDate()}
            </a>
        );
        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('dom className', function () {

        const date = new Date();
        renderer.render(
            <CalendarDay date={date} selected disabled />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <a
                className="ui-calendar-day variant-today state-disabled state-selected"
                href="#"
                disabled={true}
                onClick={() => {}} >
                {date.getDate()}
            </a>
        );
        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('shouldComponentUpdate', () => {
        const component = TestUtils.renderIntoDocument(<CalendarDay date={new Date()} />);
        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(component.shouldComponentUpdate({date: new Date()})).toBe(false);
        expect(component.shouldComponentUpdate({selected: true})).toBe(true);
        expect(component.shouldComponentUpdate({disabled: true})).toBe(true);
    });

    it('click', done => {
        const spy = expect.createSpy();
        const date = new Date();

        let node = document.createElement('div');
        let component = ReactDOM.render(<CalendarDay date={date} onClick={spy} />, node);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(component));

        then(() => {
            expect(spy).toHaveBeenCalled();
            /* eslint-disable fecs-no-arguments */
            expect(spy.calls[0].arguments[0]).toEqual({target: component, date});
            /* eslint-enable fecs-no-arguments */

            component = ReactDOM.render(<CalendarDay date={date} onClick={spy} disabled/>, node);
            TestUtils.Simulate.click(ReactDOM.findDOMNode(component));
        })
        .then(() => {
            expect(spy.calls.length).toBe(1);
            ReactDOM.unmountComponentAtNode(node);
            node = null;
            done();
        });

    });

});
