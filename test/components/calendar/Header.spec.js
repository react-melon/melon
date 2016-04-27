/**
 * @file CalendarHeader单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import CalendarHeader from '../../../src/calendar/Header';
import * as dateUtil from '../../../src/common/util/date';

expect.extend(expectJSX);

describe('CalendarHeader', function () {

    it('work', function () {
        const renderer = createRenderer();
        const date = new Date();
        renderer.render(
            <CalendarHeader date={date} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div className="ui-calendar-header">
                <p className="ui-calendar-header-year">{date.getFullYear()}</p>
                <p className="ui-calendar-header-week">{dateUtil.getDayOfWeek(date)}</p>
                <p className="ui-calendar-header-date">{dateUtil.getShortMonth(date) + date.getDate() + '日'}</p>
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
