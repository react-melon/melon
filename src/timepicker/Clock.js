/**
 * @file melon/TimePickerClock
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {create} from '../common/util/cxBuilder';
import {range} from '../common/util/array';
import {getPosition} from '../common/util/dom';

import ClockItem from './ClockItem';
import ClockHand from './ClockHand';

const cx = create('TimePickerClock');
const {
    PI,
    atan
} = Math;

export default class TimePickerClock extends Component {

    constructor(props) {
        super(props);

        this.onTimeChange = this.onTimeChange.bind(this);
        this.onMouseChange = this.onMouseChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {

        const {
            time,
            mode,
            begin,
            end
        } = this.props;

        return !moment(time).isSame(nextProps.time)
            || mode !== nextProps.mode
            || !moment(begin).isSame(nextProps.begin)
            || !moment(end).isSame(nextProps.end);
    }

    onTimeChange({time}) {
        this.props.onChange({time});
    }

    onMouseChange({clientX, clientY}) {

        const mainPosition = getPosition(this.refs.main);
        const radius = mainPosition.width / 2;
        const pos = {
            x: clientX - mainPosition.left - radius,
            y: clientY - mainPosition.top - radius
        };

        let deg;

        if (pos.y === 0) {
            return;
        }

        if (pos.x >= 0 && pos.y < 0) {
            deg = -180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x >= 0 && pos.y > 0) {
            deg = 180 - 180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x < 0 && pos.y > 0) {
            deg = 180 - 180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x < 0 && pos.y < 0) {
            deg = 360 - 180 * atan(pos.x / pos.y) / PI;
        }

        const {
            time,
            mode
        } = this.props;

        const single = mode === 'minute' ? 6 : 30;
        let number = Math.round(deg / single);
        number = mode === 'hour' && number === 0 ? 12 : number;
        number = mode === 'hour' && time.getHours() > 12 ? number + 12 : number;

        this.onTimeChange({
            time: moment(time)[mode](number).toDate()
        });

    }

    renderItems() {

        const {
            time,
            mode,
            begin,
            end
        } = this.props;

        const items = mode === 'hour'
            ? range(1, 13)
            : range(0, 60, 5);

        return items.map(number => {

            let timeMoment;

            let selected = false;
            if (mode === 'hour') {
                const hour = moment(time).hour();
                selected = (hour > 12 ? (hour - 12) : hour) === number;
                const itemHour = hour > 12 ? (number + 12) : number;
                timeMoment = moment(time).hour(itemHour);
            }
            else {
                selected = moment(time).minute() === number;
                timeMoment = moment(time).minute(number);
            }

            let disabled = false;
            disabled = begin ? timeMoment.isBefore(begin) : false;
            disabled = end ? timeMoment.isAfter(end) : false;

            return (
                <ClockItem
                    key={mode + number}
                    time={timeMoment.toDate()}
                    mode={mode}
                    selected={selected}
                    disabled={disabled} />
            );
        });

    }

    render() {

        const {
            time,
            mode
        } = this.props;

        const className = cx(this.props)
            .addVariants(mode)
            .build();

        return (
            <div className={className}>
                <div
                    className={cx().part('main').build()}
                    ref="main"
                    onMouseUp={this.onMouseChange}>
                    <ClockHand
                        time={time}
                        mode={mode}
                        onChange={this.onTimeChange} />
                    {this.renderItems()}
                </div>
            </div>
        );

    }

}

TimePickerClock.displayName = 'TimePickerClock';

TimePickerClock.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
