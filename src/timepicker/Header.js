/**
 * @file melon/TimePickerHeader
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {PropTypes} from 'react';
import moment from 'moment';

import {create} from '../common/util/cxBuilder';

const cx = create('TimePickerHeader');

export default function TimePickerHeader(props) {

    const {time, mode} = props;
    const timeMoment = moment(time);

    const selected = mode === 'hour';

    let hour = moment(time).hour();
    let isAfternoon = false;

    if (hour > 12 || hour === 0) {
        hour = hour === 0 ? 12 : (hour - 12);
        isAfternoon = true;
    }

    return (
        <div className={cx(props).build()}>
            <div className={cx().part('time').build()}>
                <span
                    onClick={selected && props.onModeChange ? null : () => {
                        props.onModeChange({mode: 'hour'});
                    }}
                    className={cx().part('time-hour').addStates({selected}).build()}>
                    {moment(hour + '', 'h').format('hh')}
                </span>
                <span>:</span>
                <span
                    onClick={!selected && props.onModeChange ? null : () => {
                        props.onModeChange({mode: 'minute'});
                    }}
                    className={cx().part('time-minute').addStates({selected: !selected}).build()}>
                    {timeMoment.format('mm')}
                </span>
            </div>
            <div className={cx().part('apm').build()}>
                <span
                    onClick={!isAfternoon && props.onChange ? null : () => {
                        props.onChange({time: moment(time).subtract(12, 'h').toDate()});
                    }}
                    className={cx().part('apm-am').addStates({selected: !isAfternoon}).build()}>
                    AM
                </span>
                <span
                    onClick={isAfternoon && props.onChange ? null : () => {
                        props.onChange({time: moment(time).add(12, 'h').toDate()});
                    }}
                    className={cx().part('apm-pm').addStates({selected: isAfternoon}).build()}>
                    PM
                </span>
            </div>
        </div>
    );

}

TimePickerHeader.displayName = 'TimePickerHeader';

TimePickerHeader.defaultProps = {
    time: new Date(),
    mode: 'hour'
};

TimePickerHeader.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    onModeChange: PropTypes.func
};
