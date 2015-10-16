/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title');
var Calendar = require('../src/Calendar');

var RangeCalendar = require('../src/RangeCalendar');
var UnitCalendar = require('../src/UnitCalendar');

var View = React.createClass({

    getInitialState() {
        return {
            weekRange: [],
            monthRange: [],
            yearRange: UnitCalendar
                .getContinuousFragments(
                    new Date(2012, 1, 1),
                    new Date(2015, 0, 1),
                    'year'
                )
        };

    },


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


                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            rawValue={this.state.weekRange}
                            begin={new Date(2015, 10, 2)}
                            end={new Date(2016, 0, 31)}
                            unit="week"
                            onChange={({rawValue, value}) => {
                                this.setState({
                                    weekRange: rawValue
                                });
                                console.log(value);
                            }} />
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            rawValue={this.state.monthRange}
                            begin={new Date(2015, 0, 1)}
                            end={new Date(2015, 11, 1)}
                            unit="month" />
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            rawValue={this.state.yearRange}
                            begin={new Date(2012, 0, 1)}
                            end={new Date(2020, 4, 1)}
                            unit="year" />
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = View;
