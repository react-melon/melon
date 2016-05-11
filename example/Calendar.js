/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Calendar from '../src/Calendar';

import RangeCalendar from '../src/RangeCalendar';
import UnitCalendar from '../src/UnitCalendar';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            weekRange: [],
            value: '2015-08-07',
            monthRange: []
        };
    }

    onChange(e) {
        this.setState({value: e.value});
    }

    render() {

        return (
            <div>
                <Title level={3}>Calendar</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-8">
                        <Title level={5}>日期区间</Title>
                        <RangeCalendar
                            defaultValue={['2014-10-20', '2015-10-20']}
                            begin="2014-10-21"
                            end="2016-10-19"
                            size="xxs" />
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <RangeCalendar
                            begin="2014-10-21"
                            end="2016-10-19"
                            size="xxs" />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>普通日历</Title>
                        <Calendar></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>限定区间</Title>
                        <Calendar
                            value="2015-09-01"
                            begin={new Date(2015, 7, 10)}
                            end={new Date(2015, 9, 28)}></Calendar>
                        2015-7-10 to 2015-9-28
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>自动确定</Title>
                        <Calendar autoConfirm size="xs" />
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>被控制的控件</Title>
                        <Calendar
                            autoConfirm
                            value={this.state.value}
                            onChange={this.onChange.bind(this)} size="xs" />
                    </div>
                    <div className="melon-column melon-column-4">
                        {this.state.value}
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
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            value={this.state.weekRange}
                            begin={new Date(2015, 10, 2)}
                            end={new Date(2016, 0, 31)}
                            unit="week"
                            onChange={({value}) => {
                                this.setState({
                                    weekRange: value
                                });
                            }} />
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            defaultValue={this.state.monthRange}
                            begin={new Date(2014, 10, 1)}
                            end={new Date(2015, 11, 1)}
                            unit="month" />
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>日期区间</Title>
                        <UnitCalendar
                            size="xxs"
                            defaultValue={this.state.yearRange}
                            begin={new Date(2012, 0, 1)}
                            end={new Date(2020, 4, 1)}
                            unit="year" />
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = View;
