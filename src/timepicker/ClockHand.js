/**
 * @file melon/TimePickerClockHand
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TimePickerClockHand');

export default class TimePickerClockHand extends Component {

    getStyle() {

        const {
            time,
            mode
        } = this.props;

        let number = moment(time)[mode]();
        const single = mode === 'minute' ? 6 : 30;
        const deg = (180 + single * number) % 360;

        return ['Webkit', 'Moz', 'ms', '']
            .reduce((result, prefix) => {

                return {
                    ...result,
                    [`${prefix}${prefix ? 'T' : 't'}ransform`]: `translate(-50%, 0) rotate(${deg}deg)`
                };

            }, {});

    }

    render() {

        const {
            time,
            mode
        } = this.props;

        const className = cx(this.props)
            .addVariants(mode === 'minute' && moment(time).minute() % 5 !== 0 ? 'end' : null)
            .build();

        return (
            <div className={className} style={this.getStyle()}>
                <div className={cx().part('end').build()} />
            </div>
        );
    }

}

TimePickerClockHand.displayName = 'TimePickerClockHand';

TimePickerClockHand.propTypes = {
    time: PropTypes.instanceOf(Date).isRequired,
    mode: PropTypes.oneOf(['hour', 'minute']).isRequired,
    onChange: PropTypes.func
};
