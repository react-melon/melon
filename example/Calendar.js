/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title');
var Calendar = require('../src/Calendar');

var RangeCalendar = require('../src/RangeCalendar');

var View = React.createClass({

    render: function () {

        return (
            <div>
                <Title level={3}>Calendar</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>普通日历</Title>
                        <Calendar></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>限定区间</Title>
                        <Calendar min={new Date(2015, 7, 10)} max={new Date(2015, 9, 28)}></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>自动确定</Title>
                        <Calendar min="2015-08-07" max="2015-10-12" autoOk size="xs"></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>禁用</Title>
                        <Calendar disabled></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>只读</Title>
                        <Calendar min={new Date(2015, 7, 10)} max={new Date(2015, 9, 28)} readOnly></Calendar>
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-8">
                        <Title level={5}>日期区间</Title>
                        <RangeCalendar size="xxs"></RangeCalendar>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = View;
