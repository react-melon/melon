/**
 * @file CalendarSelectorItem单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CalendarSelectorItem from '../../../src/calendar/SelectorItem';
import then from '../../then';


expect.extend(expectJSX);

describe('CalendarSelectorItem', function () {

    it('work', function () {
        const renderer = TestUtils.createRenderer();
        const date = new Date(2016, 11, 1);
        renderer.render(
            <CalendarSelectorItem date={date} mode="month" />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <li
                data-mode={'month'}
                data-value={date}
                onClick={() => {}}
                className={'ui-calendar-selector-item'}>
                <span>
                    12月
                </span>
            </li>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });


    it('click', done => {

        const spy = expect.createSpy();
        const date = new Date();

        let node = document.createElement('div');
        let component = ReactDOM.render(<CalendarSelectorItem date={date} mode="year" onClick={spy} />, node);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(component));

        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({target: component, date, mode: 'year'});
            ReactDOM.unmountComponentAtNode(node);
            node = null;
            done();
        });

    });

});
