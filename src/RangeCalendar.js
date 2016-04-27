/**
 * @file melon/RangeCalendar
 * @author cxtom <cxtom2010@gmail.com>
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import Calendar from './Calendar';
import Icon from './Icon';
import Confirm from './Confirm';
import Panel from './calendar/Panel';
import Validity from './Validity';
import {create} from './common/util/cxBuilder';
import InputComponent from './InputComponent';
import * as DateTime from './common/util/date';
import {getNextValidity} from './common/util/syncPropsToState';

const cx = create('RangeCalendar');

export default class RangeCalendar extends InputComponent {

    constructor(props, context) {

        super(props, context);

        const {begin, end} = props;

        this.state = {
            ...this.state,
            open: false,
            date: this.getNormalizeValue(this.state.value, begin, end)
        };

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.formatDate = this.formatDate.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        const {begin, end, value} = nextProps;

        if (value !== this.state.value) {
            this.setState({
                date: this.getNormalizeValue(value, begin, end)
            });
        }

        super.componentWillReceiveProps(nextProps);

    }

    getSyncUpdates(nextProps) {

        const {
            disabled, customValidity,
            value, begin, end
        } = nextProps;

        // 如果有值，那么就试着解析一下；否则设置为 null
        let date = value ? this.getNormalizeValue(value, begin, end) : null;

        const vilidity = getNextValidity(this, {value, disabled, customValidity});

        return {
            date,
            vilidity,
            value
        };

    }

    getNormalizeValue(value, begin, end) {

        if (value.length === 0) {
            return value;
        }

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        let valueBegin = this.parseDate(value[0]);
        let valueEnd = this.parseDate(value[1]);

        // 这里我们需要一个全新的 value
        value = [
            valueBegin && DateTime.isAfterDate(begin, valueBegin) ? begin : valueBegin,
            valueEnd && DateTime.isBeforeDate(end, valueEnd) ? end : valueEnd
        ];

        // 下边这种做法是错误的，不能直接修改 props 中的值
        // value[0] = _.isDate(begin) && DateTime.isAfterDate(begin, value[0]) ? begin : value[0];
        // value[1] = _.isDate(end) && DateTime.isBeforeDate(end, value[1]) ? end : value[1];

        return value;

    }

    getValue() {

        const {begin, end} = this.props;
        const {value} = this.state;

        return this
            .getNormalizeValue(value, begin, end)
            .map(date => {
                return this.formatDate(date);
            });

    }

    /**
     * 点击textbox时触发
     *
     * @private
     */
    onLabelClick() {

        const {
            disabled,
            readOnly
        } = this.props;

        if (disabled || readOnly) {
            return;
        }

        this.setState({open: true});

    }

    /**
     * Calendar DialogCalendar隐藏时触发
     *
     * @private
     */
    onCancel() {
        this.setState({
            open: false
        });
    }

    onDateChange(index, e) {

        const {value} = e;

        let date = [...this.state.date];

        date[index] = value;

        this.setState({
            date: date,
            month: date
        });

    }

    onConfirm() {

        const {date, value} = this.state;

        // 不管怎么样，先把窗口关了
        this.setState({
            open: false
        }, () => {

            // 如果值发生了变化，那么释放一个 change 事件
            if (
                !DateTime.isEqualDate(date[0], this.parseDate(value[0]))
                || !DateTime.isEqualDate(date[1], this.parseDate(value[1]))
            ) {
                super.onChange({
                    type: 'change',
                    target: this,
                    value: date.map(this.formatDate)
                });
            }

        });

    }

    /**
     * 按设置格式化日期
     *
     * @param {Date} date 日期
     * @return {string}
     */
    formatDate(date) {

        const {dateFormat, lang} = this.props;

        return DateTime.format(
            date,
            dateFormat.toLowerCase(),
            lang
        );

    }

    parseDate(date) {

        if (typeof date !== 'string') {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    }

    render() {

        const props = this.props;

        let {
            lang,
            disabled,
            size,
            dateFormat,
            name,
            begin,
            end,
            validity,
            placeholder,
            ...others
        } = props;

        const value = this.getValue();

        const {open, date} = this.state;

        begin = begin ? this.parseDate(begin) : null;
        end = end ? this.parseDate(end) : null;

        return (
            <div
                {...others}
                className={cx(props).addStates({focus: open}).build()}>
                <input
                    name={name}
                    ref="input"
                    type="hidden"
                    value={value.join(',')}
                    disabled={disabled} />
                <label onClick={this.onLabelClick}>
                    {value.length === 0
                        ? (
                            <span className={cx().part('label-placeholder').build()}>
                                {placeholder}
                            </span>
                        ) : `${value[0]} 至 ${value[1]}`
                    }
                    <Icon icon='expand-more' />
                </label>
                <Validity validity={validity} />
                <Confirm
                    open={open}
                    variants={['calendar']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    size={size}
                    buttonVariants={['secondery', 'calendar']} >
                    <div className={cx().part('row').build()}>
                        <Panel
                            lang={lang}
                            date={date[0]}
                            begin={begin}
                            end={date[1]}
                            onChange={this.onDateChange.bind(this, 0)} />
                        <Panel
                            lang={lang}
                            date={date[1]}
                            begin={date[0]}
                            end={end}
                            onChange={this.onDateChange.bind(this, 1)} />
                    </div>
                </Confirm>
            </div>
        );

    }

}

RangeCalendar.displayName = 'RangeCalendar';

RangeCalendar.defaultProps = {
    ...Calendar.defaultProps,
    defaultValue: [],
    placeholder: '请选择'
};

RangeCalendar.propTypes = {
    ...Calendar.propTypes,
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    autoOk: PropTypes.bool,
    dateFormat: PropTypes.string,
    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};
