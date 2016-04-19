/**
 * @file UnitCalendar
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import BoxGroup from './BoxGroup';
import * as date from './common/util/date';
import {create} from './common/util/cxBuilder';
import InputComponent from './InputComponent';

const cx = create('UnitCalendar');

export default class UnitCalendar extends InputComponent {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {

        const nextValue = e.value;

        const {continuous, value} = this.props;

        this.props.onChange({

            target: this,

            // 如果是连续的，这里需要算一下，不是连续的就以新值为主
            value: continuous
                ? this.calculate(value, nextValue).map(this.parse)
                : value
        });

    }

    calculate(current, next) {

        current = current.map(this.format).sort();

        next = next.sort();

        let cLength = current.length;
        let nLength = next.length;
        let {unit} = this.props;

        if (cLength === nLength) {
            return current;
        }

        if (!cLength || !nLength) {
            return next;
        }

        // fill
        if (cLength < nLength) {

            let firtNext = new Date(next[0]);
            let firstCurrent = new Date(current[0]);

            if (firtNext < firstCurrent) {
                return getContinuousFragments(firtNext, firstCurrent, unit).map(this.format).concat(current);
            }

            let lastNext = new Date(next[nLength - 1]);
            lastNext.setDate(lastNext.getDate() + 1);
            let lastCurrent = new Date(current[cLength - 1]);

            return current.concat(getContinuousFragments(lastCurrent, lastNext, unit).slice(1).map(this.format));

        }

        // cut
        for (let i = 0; i < nLength; ++i) {
            if (current[i] < next[i]) {
                if (i === 0) {
                    return current.slice(1);
                }
                return current.slice(0, i);
            }
        }

        return current.slice(0, -1);

    }

    parse(time) {
        return new Date(time);
    }

    format(time) {
        return date.format(time, 'yyyy-mm-dd');
    }

    parseValue(value = '') {
        return value
            .split(',')
            .map(function (date) {
                return this.parse(date);
            });
    }

    stringifyValue(value = []) {
        return value
            .map(function (term) {
                return this.format(term);
            })
            .join(',');
    }

    render() {

        let {begin, end, unit, value, format, ...rest} = this.props;
        let {onChange} = this;

        value = value
            .map(function (fragment) {
                return date.format(normalize(fragment, unit), format);
            })
            .sort();

        const options = getContinuousFragments(begin, end, unit).map(fragment => {
            let begin = this.format(fragment);
            let end = getNextTime(fragment, unit);
            end.setDate(end.getDate() - 1);
            end = this.format(end);
            return (<option key={begin} value={begin} label={`${begin} ~ ${end}`} />);
        });

        return (
            <div className={cx(this.props).build()}>
                <BoxGroup
                    {...rest}
                    boxModel="checkbox"
                    onChange={onChange}
                    value={value}>
                    {options}
                </BoxGroup>
            </div>
        );

    }


}

UnitCalendar.propTypes = {
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['week', 'month', 'year']).isRequired,
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    continuous: PropTypes.bool.isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string)
};

UnitCalendar.defaultProps = {
    continuous: true,
    value: [],
    defaultValue: [],
    format: 'yyyy-mm-dd'
};

export function normalize(time, unit) {
    time = new Date(time);
    // 得到周一
    if (unit === 'week') {
        time.setDate(time.getDate() - time.getDay() + 1);
    }
    // 得到1日
    else if (unit === 'month') {
        time.setDate(1);
    }
    // 得到1月1日
    else {
        time.setMonth(0);
        time.setDate(1);
    }
    return time;
}

export function getNextTime(time, unit) {
    time = normalize(time, unit);
    if (unit === 'week') {
        time.setDate(time.getDate() + 7);
    }
    else if (unit === 'month') {
        time.setMonth(time.getMonth() + 1);
    }
    else {
        time.setFullYear(time.getFullYear() + 1);
    }
    return time;
}

export function getContinuousFragments(begin, end, unit) {

    begin = normalize(begin, unit);

    let result = [];

    while (begin < end) {
        result.push(new Date(begin));
        if (unit === 'week') {
            begin.setDate(begin.getDate() + 7);
        }
        else if (unit === 'month') {
            begin.setMonth(begin.getMonth() + 1);
        }
        else {
            begin.setFullYear(begin.getFullYear() + 1);
        }
    }

    return result;

}
