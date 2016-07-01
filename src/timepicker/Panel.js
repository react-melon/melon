/**
 * @file melon/TimePickerPanel
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';

import Header from './Header';
import Clock from './Clock';

const cx = create('TimePickerPanel');

export default class TimePickerPanel extends Component {

    constructor(props) {

        super(props);

        this.onModeChange = this.onModeChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);

        this.state = {
            time: props.time,
            mode: props.mode
        };
    }

    componentWillReceiveProps(nextProps) {

        const time = nextProps.time;

        if (this.props.time !== time) {
            this.setState({time});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !moment(nextState.time).isSame(this.state.time, 'minute')
            || nextState.mode !== this.state.mode;
    }

    onModeChange({mode}) {
        this.setState({mode});
    }

    onTimeChange({time, isModeChange = false}) {

        let nextState = {time};

        if (this.props.mode === 'hour' && isModeChange) {
            nextState.mode = 'minute';
        }

        this.setState(nextState, () => {
            this.props.onChange({time});
        });
    }

    render() {

        const {
            time,
            mode
        } = this.state;

        return (
            <div className={cx(this.props).build()}>
                <Header
                    time={time}
                    mode={mode}
                    onModeChange={this.onModeChange}
                    onChange={this.onTimeChange} />
                <Clock
                    time={time}
                    mode={mode}
                    onChange={this.onTimeChange} />
            </div>
        );

    }

}

TimePickerPanel.displayName = 'TimePickerPanel';

TimePickerPanel.defaultProps = {
    time: new Date(),
    mode: 'hour'
};

TimePickerPanel.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
