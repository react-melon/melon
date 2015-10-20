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

    getInitialState: function () {
        return {
            weekRange: [],
            value: '2015-08-07',
            monthRange: [],
            yearRange: UnitCalendar
                .getContinuousFragments(
                    new Date(2012, 1, 1),
                    new Date(2015, 0, 1),
                    'year'
                )
        };
    },

    onChange: function (e) {
        this.setState({value: e.value});
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
                        <Calendar begin={new Date(2015, 7, 10)} end={new Date(2015, 9, 28)}></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>自动确定</Title>
                        <Calendar begin="2015-08-07" end="2015-10-12" autoOk size="xs"></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>被控制的控件</Title>
                        <Calendar autoOk value={this.state.value} onChange={this.onChange} size="xs"></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>禁用</Title>
                        <Calendar disabled></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>只读</Title>
                        <Calendar begin={new Date(2014, 9, 10)} end={new Date(2015, 9, 10)} readOnly></Calendar>
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-8">
                        <Title level={5}>日期区间</Title>
                        <RangeCalendar
                            defaultValue="2014-10-20,2015-10-20"
                            begin="2014-10-21"
                            end="2015-10-19"
                            size="xxs" />
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
                            begin={new Date(2014, 10, 1)}
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
