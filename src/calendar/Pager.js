/**
 * @file Calendar/CalendarPager
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';
import Icon from '../Icon';
import * as DateTime from '../common/util/date';

const cx = create('CalendarPager');

export default class CalendarPager extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

        const target = e.currentTarget;
        const month = this.props.month;

        const action = target.getAttribute('data-action');
        const newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);

        const onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                month: newMonth
            });
        }

    }

    render() {

        const {
            maxDate,
            minDate,
            month
        } = this.props;

        const m = month.getMonth() + 1;
        const y = month.getFullYear();

        const beforeState = {
            disabled: DateTime.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate)
        };

        const nextState = {
            disabled: DateTime.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate)
        };

        return (
            <div className={cx(this.props).build()}>
                <Icon
                    icon="navigate-before"
                    data-role="pager"
                    className={cx().part('prev').addStates(beforeState).build()}
                    data-action="prev"
                    onClick={beforeState.disabled ? null : this.onClick} />
                <Icon
                    icon="navigate-next"
                    data-role="pager"
                    className={cx().part('next').addStates(nextState).build()}
                    data-action="next"
                    onClick={nextState.disabled ? null : this.onClick} />
                {y + ' 年 ' + m + ' 月'}
            </div>
        );
    }

}

CalendarPager.displayName = 'CalendarPager';

CalendarPager.propTypes = {
    month: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func
};
