/**
 * @file esui-react/RangeCalendar
 * @author cxtom <cxtom2010@gmail.com>
 * @author leon <ludafa@outlook.com>
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('RangeCalendar');
const Calendar = require('./Calendar');
const Icon = require('./Icon');
const Confirm = require('./dialog/Confirm');
const Panel = require('./calendar/Panel');

const DateTime = require('./common/util/date');
const _ = require('underscore');

const RangeCalendar = React.createClass({

    displayName: 'RangeCalendar',

    getInitialState() {

        return {
            open: false,
            date: this.getNormalizeValue(this.props)
        };

    },

    componentWillReceiveProps(nextProps) {

        const {value} = nextProps;

        if (value !== this.props.value) {
            this.setState({
                date: this.getNormalizeValue(nextProps)
            });
        }

    },

    getNormalizeValue(props) {

        let {
            begin,
            end,
            value
        } = props;

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

    },

    getValue() {
        return this
            .getNormalizeValue(this.props)
            .map((date) => {
                return this.formatDate(date);
            });
    },

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

    },

    /**
     * Calendar DialogCalendar隐藏时触发
     *
     * @private
     */
    onCancel() {
        this.setState({
            open: false
        });
    },

    onDateChange(index, e) {

        const {value} = e;

        let date = [...this.state.date];

        date[index] = value;

        this.setState({
            date: date,
            month: date
        });

    },

    onConfirm() {

        const {date} = this.state;
        const {value, onChange} = this.props;

        // 不管怎么样，先把窗口关了
        this.setState({
            open: false
        }, () => {

            // 如果值发生了变化，那么释放一个 change 事件
            if (
                !DateTime.isEqualDate(date[0], this.parseDate(value[0]))
                || !DateTime.isEqualDate(date[1], this.parseDate(value[1]))
            ) {
                onChange({
                    type: 'change',
                    target: this,
                    value: date.map(this.formatDate)
                });
            }

        });

    },

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

    },

    parseDate(date) {

        if (!_.isString(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    },

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
            ...others
        } = props;

        const value = this.getValue();

        const {open, date} = this.state;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

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
                    {`${value[0]} 至 ${value[1]}`}
                    <Icon icon='expand-more' />
                </label>
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
                                onChange={this.onDateChange.bind(this, 1)}/>
                        </div>
                </Confirm>
            </div>
        );

    }

});

RangeCalendar.defaultProps = {
    ...Calendar.defaultProps,
    value: [
        DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
        DateTime.format(DateTime.addMonths(new Date(), 1), 'yyyy-mm-dd', Calendar.LANG)
    ]
};

const {PropTypes} = React;

RangeCalendar.propTypes = {
    ...Calendar.propTypes,
    value: PropTypes.arrayOf(PropTypes.string),
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

module.exports = require('./createInputComponent').create(RangeCalendar);
