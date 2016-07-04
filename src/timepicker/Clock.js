/**
 * @file melon/TimePickerClock
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';
import {range} from 'melon-core/util/array';
import {
    getPosition,
    on,
    off
} from '../common/util/dom';

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
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.onMouseChange = (() => {

            let handler = this.onMouseChange;

            return e => {
                clearTimeout(this.mouseChangeTimer);
                this.mouseChangeTimer = setTimeout(handler.bind(this, e), 5);
            };

        })();
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

    componentWillUnmount() {
        clearTimeout(this.mouseChangeTimer);
        this.mouseChangeTimer = null;
    }

    onTimeChange({time}) {
        this.props.onChange({time});
    }

    onMouseDown(e) {

        if (this.props.mode === 'minute') {
            on(this.refs.main, 'mousemove', this.onMouseChange);
            on(document, 'mouseup', this.onMouseUp);
        }
        else {
            on(this.refs.main, 'mouseup', this.onMouseChange);
        }
    }

    onMouseUp(e) {

        if (this.props.mode === 'minute') {
            this.onMouseChange(e);
            off(this.refs.main, 'mousemove', this.onMouseChange);
            off(document, 'mouseup', this.onMouseUp);
        }
        else {
            off(this.refs.main, 'mouseup', this.onMouseChange);
        }
    }

    onMouseChange({pageX, pageY}) {

        const mainPosition = getPosition(this.refs.main);
        const radius = mainPosition.width / 2;

        const pos = {
            x: pageX - mainPosition.left - radius,
            y: pageY - mainPosition.top - radius
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

        if (moment(time)[mode](number).isSame(time)) {
            return;
        }

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
                let hour = moment(time).hour();
                hour = hour === 0 ? 12 : hour;
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
                    onMouseDown={this.onMouseDown}>
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
