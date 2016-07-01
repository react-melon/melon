/**
 * @file CalendarMonth
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Day from './Day';
import * as DateTime from '../common/util/date';

const cx = create('CalendarMonth');

export default class CalendarMonth extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderDay = this.renderDay.bind(this);
    }

    onClick(e) {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                date: e.date
            });
        }
    }

    renderWeekHeader() {
        const days = this.props.lang.days.split(',');

        return (
            <div className={cx().part('weekheader').build()}>
                {days.map(function (day, index) {
                    return <span key={index}>{day}</span>;
                })}
            </div>
        );
    }

    renderDates() {

        const month = this.props.month;

        const weekArray = DateTime.getFullWeekArray(month);

        return (<ul>{weekArray.map(this.renderWeek)}</ul>);
    }

    renderWeek(week, index) {

        return (
            <li key={index} className={cx().part('week').build()}>
                {week.map(this.renderDay)}
            </li>
        );
    }

    renderDay(day, index) {

        const {
            date,
            minDate,
            maxDate
        } = this.props;

        const selected = DateTime.isEqualDate(day.date, date);
        const disabled = (DateTime.isDate(minDate) && DateTime.isBeforeDate(day.date, minDate))
                        || (DateTime.isDate(maxDate) && DateTime.isAfterDate(day.date, maxDate));

        return (
            <Day
                key={day.date}
                date={day.date}
                variants={day.variants}
                disabled={disabled}
                selected={selected}
                onClick={this.onClick} />
        );

    }

    render() {

        return (
            <div className={cx(this.props).build()}>
                {this.renderWeekHeader()}
                {this.renderDates()}
            </div>
        );
    }

}

CalendarMonth.displayName = 'CalendarMonth';

CalendarMonth.propTypes = {
    date: PropTypes.object.isRequired,
    month: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    }).isRequired
};
