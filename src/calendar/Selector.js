/**
 * @file Calendar/CalendarSelector
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './SelectorItem';
import * as DateTime from '../common/util/date';
import {range} from '../common/util/array';

const cx = create('CalendarSelector');

export default class CalendarSelector extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

        const {onChange} = this.props;

        if (onChange) {
            onChange({
                target: this,
                mode: e.mode,
                date: e.date
            });
        }

    }

    componentDidMount() {
        const item = this.refs.item ? ReactDOM.findDOMNode(this.refs.item) : null;

        // FIX jsdom 上没有这个方法，所以先判断一下
        item && item.scrollIntoView && item.scrollIntoView();
    }

    componentDidUpdate() {
        const item = this.refs.item ? ReactDOM.findDOMNode(this.refs.item) : null;

        // FIX jsdom 上没有这个方法，所以先判断一下
        item && item.scrollIntoView && item.scrollIntoView();
    }

    render() {

        const {
            minDate,
            maxDate,
            date,
            ...rest
        } = this.props;

        let children = [];

        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();

        if (this.isMonthView()) {
            children = range(12).map((month, index) => {

                const newDate = new Date(y, month, d);
                const disabled = (DateTime.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                                || (DateTime.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate));
                const selected = month === m;

                return (
                    <Item
                        key={index}
                        mode="month"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        disabled={disabled}
                        selected={selected} />
                );

            });
        }
        else {

            const maxRange = CalendarSelector.MAX_RANGE;

            range(y - maxRange, y + maxRange).forEach((year, index) => {

                if ((DateTime.isDate(minDate) && year < minDate.getFullYear())
                    || (DateTime.isDate(maxDate) && year > maxDate.getFullYear())) {

                    return;
                }

                const newDate = new Date(year, m, d);
                const selected = year === y;

                children.push(
                    <Item
                        key={index}
                        mode="year"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        selected={selected} />
                );

            });

        }

        return (
            <ul {...rest} className={cx(this.props).build()}>
                {children}
            </ul>
        );

    }

    /**
     * 是否显示日期
     *
     * @return {boolean}
     * @private
     */
    isMonthView() {

        const {
            minDate,
            maxDate,
            mode
        } = this.props;

        let onlyOneYear = false;

        // 如果范围中只有一年，则跳过yearview，直接显示month view
        if (mode === 'year' && DateTime.isDate(minDate) && DateTime.isDate(maxDate)) {
            onlyOneYear = (DateTime.yearDiff(minDate, maxDate) === 0);
        }

        return mode === 'month' || onlyOneYear;

    }

}

CalendarSelector.displayName = 'CalendarSelector';

CalendarSelector.MAX_RANGE = 10;

CalendarSelector.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['month', 'year'])
};
