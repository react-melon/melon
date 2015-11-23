/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Calendar');
const Icon = require('./Icon');
const Confirm = require('./dialog/Confirm');
const Panel = require('./calendar/Panel');

const DateTime = require('./common/util/date');
const _ = require('underscore');
const PropTypes = React.PropTypes;

const Calendar = React.createClass({

    displayName: 'Calendar',

    getInitialState() {

        return {

            // 缓存用户在 confirm 前的选中值
            date: this.parseDate(this.props.value),

            // 是否打开选择窗
            open: false
        };

    },

    componentWillReceiveProps(nextProps) {

        const {value} = nextProps;

        if (value !== this.props.value) {
            this.setState({
                date: this.parseDate(value)
            });
        }

    },

    /**
     * 格式化日期对象
     *
     * @param  {string} value 日期字符串
     * @return {Date}         转化后的日期对象
     * @private
     */
    parseValue(value) {
        return this.parseDate(value);
    },

    /**
     * 格式化日期
     *
     * @param {Date} rawValue 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的dateFormat
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(rawValue) {

        if (!_.isDate(rawValue)) {
            return rawValue;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.format(rawValue, format, this.props.lang);

    },

    parseDate(date) {

        if (!_.isString(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    },

    getValue() {
        return this.stringifyValue(this.props.value);
    },

    /**
     * 点击textbox时触发
     *
     * @private
     */
    onLabelClick() {

        if (this.props.disabled || this.props.readOnly) {
            return;
        }

        this.setState({open: true});

    },

    /**
     * rawValue 在Calendar Dialog上点击确定或取消按钮触发
     *
     * @private
     */
    onConfirm() {

        const {value, date} = this.state;

        if (DateTime.isEqualDate(date, value)) {
            this.setState({open: false});
            return;
        }

        this.setState({
            open: false
        }, () => {
            this.props.onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(date)
            });
        });

    },

    onCancel() {
        this.setState({open: false});
    },

    onDateChange(e) {

        const {value} = e;
        const {autoConfirm} = this.props;

        this.setState({
            date: value
        }, () => {
            if (autoConfirm) {
                this.onConfirm();
            }
        });

    },

    render() {

        const {
            state,
            props
        } = this;

        const {
            lang,
            value,
            disabled,
            size,
            name,
            dateFormat,
            ...others
        } = props;

        let {
            begin, end
        } = props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        const {open, date} = state;

        return (
            <div
                {...others}
                className={cx(props).addStates({focus: open}).build()}>
                <input
                    name={name}
                    ref="input"
                    type="hidden"
                    value={value}
                    disabled={disabled}
                    size={size} />
                <label onClick={this.onLabelClick}>
                    {DateTime.format(
                        this.parseDate(value),
                        dateFormat.toLowerCase(),
                        lang
                    )}
                    <Icon icon='expand-more' />
                </label>
                <Confirm
                    open={open}
                    variants={['calendar']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    size={size}
                    buttonVariants={['secondery', 'calendar']} >
                    <Panel
                        date={date}
                        begin={begin}
                        end={end}
                        lang={lang}
                        onChange={this.onDateChange} />
                </Confirm>
            </div>
        );

    }
});

Calendar.LANG = {

    // 对于 '周' 的称呼
    week: '周',

    // 星期对应的顺序表示
    days: '日,一,二,三,四,五,六'

};

Calendar.defaultProps = {
    value: DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
    dateFormat: 'yyyy-MM-dd',
    lang: Calendar.LANG,
    validateEvents: ['change']
};

Calendar.propTypes = {

    value: PropTypes.string,

    autoConfirm: PropTypes.bool,

    dateFormat: PropTypes.string,

    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),

    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),

    onChange: PropTypes.func,

    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    })

};

module.exports = require('./createInputComponent').create(Calendar);
