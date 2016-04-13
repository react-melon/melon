/**
 * @file CalendarMonth
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';
import Day from './Day';
import * as DateTime from '../common/util/date';

const cx = create('CalendarMonth');

export default class CalendarMonth extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
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
                    return <span key={day}>{day}</span>;
                })}
            </div>
        );
    }

    renderDates() {
        const props = this.props;
        const month = props.month;

        const weekArray = DateTime.getFullWeekArray(month);

        const weeks = [];
        const len = weekArray.length;

        weeks.push(
            this.renderDay(weekArray[0], ['pre-month'])
        );
        weeks[0] = weeks[0].concat(
            this.renderDay(weekArray[1], [])
        );

        for (let i = 2; i < len - 1; i++) {
            weeks.push(
                this.renderDay(weekArray[i], [])
            );
        }

        weeks[len - 3] = weeks[len - 3].concat(
            this.renderDay(weekArray[len - 1], ['next-month'])
        );

        return (<ul>{weeks.map(this.renderWeek)}</ul>);
    }

    renderWeek(week, index) {

        return (
            <li key={index} className={cx().part('week').build()}>
                {week}
            </li>
        );

    }

    renderDay(arr, variants) {

        const {
            date,
            minDate,
            maxDate
        } = this.props;

        return arr.map((day, index) => {

            const selected = DateTime.isEqualDate(day, date);
            const disabled = (DateTime.isDate(minDate) && DateTime.isBeforeDate(day, minDate))
                            || (DateTime.isDate(maxDate) && DateTime.isAfterDate(day, maxDate));

            return (
                <Day
                    key={day}
                    date={day}
                    variants={variants}
                    disabled={disabled}
                    selected={selected}
                    onClick={this.onClick} />
            );
        });

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
        days: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};
