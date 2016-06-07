/**
 * @file melon/TimePicker
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';

import InputComponent from './InputComponent';
import {create} from './common/util/cxBuilder';
import Icon  from './Icon';
import Confirm from './Confirm';
import Panel from './timepicker/Panel';
import Validity from './Validity';
import {getNextValidity} from './common/util/syncPropsToState';


const cx = create('TimePicker');

export default class TimePicker extends InputComponent {

    constructor(props, context) {

        super(props, context);

        const value = this.state.value;

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);

        this.state = {

            ...this.state,

            // 缓存用户在 confirm 前的选中值
            time: value ? this.parseValue(value) : new Date(),

            // 是否打开选择窗
            open: false
        };

    }

    componentDidMount() {

        super.componentDidMount();

        let container = this.container = document.createElement('div');

        container.className = cx().part('popup').build();

        document.body.appendChild(container);
        this.renderPopup(this.props);
    }

    componentDidUpdate() {
        this.renderPopup(this.props);
    }

    renderPopup(props) {

        const {
            size,
            timeFormat
        } = props;

        let {begin, end} = props;

        begin = begin ? this.parseValue(begin) : null;
        end = end ? this.parseValue(end) : null;

        this.popup = ReactDOM.render(
            <Confirm
                open={this.state.open}
                variants={['timepicker']}
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
                onShow={this.props.onFocus}
                onHide={this.props.onBlur}
                size={size}
                width="adaptive"
                buttonVariants={['secondery', 'timepicker']} >
                <Panel
                    time={this.state.time}
                    begin={begin}
                    end={end}
                    format={timeFormat}
                    onChange={this.onTimeChange} />
            </Confirm>,
            this.container
        );
    }

    componentWillUnmount() {

        let container = this.container;

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            this.container = container = null;
        }
    }

    getSyncUpdates(nextProps) {

        const {disabled, customValidity, value} = nextProps;

        // 如果有值，那么就试着解析一下；否则设置为 null
        let time = value ? this.parseValue(value) : null;

        // 如果 time 为 null 或者是 invalid time，那么就用上默认值；
        // 否则就用解析出来的这个值
        time = !time || isNaN(time.getTime()) ? new Date() : time;

        const vilidity = getNextValidity(this, {value, disabled, customValidity});

        return {
            time,
            vilidity,
            value: this.stringifyValue(time)
        };

    }

    /**
     * 格式化日期
     *
     * @param {Date} time 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的timeFormat
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(time) {

        if (typeof time === 'string') {
            return time;
        }

        const timeFormat = this.props.timeFormat;

        return moment(time).format(timeFormat);
    }

    /**
     * 格式化日期对象
     *
     * @param  {string} date 日期字符串
     * @return {Date}        转化后的日期对象
     * @private
     */
    parseValue(date) {

        if (typeof date !== 'string') {
            return date;
        }

        return moment(date, this.props.timeFormat).toDate();
    }


    onLabelClick(e) {

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

        this.setState({open: true});

    }

    /**
     * rawValue 在 TimePicker Dialog上点击确定或取消按钮触发
     *
     * @private
     */
    onConfirm() {

        let {value, time} = this.state;

        value = this.parseValue(value);

        const valueMoment = moment(value, this.timeFormat);
        const timeMoment = moment(time);

        if (value !== '' && valueMoment.get('hour') === timeMoment.get('hour')
            && valueMoment.get('minute') === timeMoment.get('minute')) {
            this.setState({open: false});
        }

        this.setState({open: false}, () => {

            super.onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(time)
            });

        });

    }

    onCancel() {
        this.setState({open: false});
    }

    onTimeChange({time}) {
        this.setState({time});
    }

    render() {

        const {
            state,
            props
        } = this;

        const {
            disabled,
            name,
            placeholder,
            timeFormat,
            labelFormat,
            ...others
        } = props;

        const {value, validity} = state;

        const open = state.open;
        const className = cx(props)
            .addStates({focus: open})
            .build();

        return (
            <div {...others} className={className}>
                <input
                    name={name}
                    ref="input"
                    type="hidden"
                    value={value}
                    disabled={disabled} />
                <label onClick={this.onLabelClick} className={cx().part('label').build()}>
                    {value ? moment(value, timeFormat).format(labelFormat) : (
                        <span className={cx().part('label-placeholder').build()}>
                            {placeholder}
                        </span>
                    )}
                    <Icon icon='expand-more' />
                </label>
                <Validity validity={validity} />
            </div>
        );

    }
}

TimePicker.displayName = 'TimePicker';

TimePicker.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: '',
    timeFormat: 'HH:mm:ss',
    labelFormat: 'HH:mm',
    placeholder: '请选择',
    autoConfirm: false
};

TimePicker.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.string,
    autoConfirm: PropTypes.bool,
    timeFormat: PropTypes.string,
    labalFormat: PropTypes.string,
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};
