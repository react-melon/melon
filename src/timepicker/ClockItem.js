/**
 * @file melon/TimePickerClockItem
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TimePickerClockItem');

const PI = Math.PI;

export default class TimePickerClockItem extends Component {

    getStyle() {

        const {
            time,
            mode
        } = this.props;

        let number = moment(time)[mode]();
        const single = 30;

        if (mode === 'minute') {
            number = parseInt(number / 5, 10);
        }

        return ['Webkit', 'Moz', 'ms', '']
            .reduce((result, prefix) => {

                const x = 6.125 * Math.sin(single * number * PI / 180);
                const y = -6.125 * Math.cos(single * number * PI / 180);

                return {
                    ...result,
                    [`${prefix}${prefix ? 'T' : 't'}ransform`]: `translate(${x}em, ${y}em)`
                };

            }, {});

    }

    render() {

        const {
            selected,
            time,
            mode
        } = this.props;

        const className = cx(this.props)
            .addStates({selected})
            .build();

        return (
            <span className={className} style={this.getStyle()}>
                {moment(time).format(mode === 'hour' ? 'hh' : 'mm')}
            </span>
        );
    }

}

TimePickerClockItem.displayName = 'TimePickerClockItem';

TimePickerClockItem.propTypes = {
    time: PropTypes.instanceOf(Date).isRequired,
    mode: PropTypes.oneOf(['hour', 'minute']).isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
