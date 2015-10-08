/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var TextBox = require('./TextBox');
var Header = require('./calendar/Header');
var Month = require('./calendar/Month');
var Selector = require('./calendar/Selector');
var Pager = require('./calendar/Pager');
var Confirm = require('./dialog/Confirm');

var DateTime = require('./common/util/date');
var _ = require('underscore');
var PropTypes = React.PropTypes;

class Calendar extends InputComponent {

    constructor(props) {

        super(props);

        let rawValue = this.state.rawValue;

        let open = false;
        let month = rawValue;
        let mode = 'main';
        let date = rawValue

        this.state = {
            ...this.state,
            open,
            month,
            mode,
            date
        };

        this.onInputFocus     = this.onInputFocus.bind(this);
        this.onHide           = this.onHide.bind(this);
        this.onConfirm        = this.onConfirm.bind(this);
        this.onHeaderClick    = this.onHeaderClick.bind(this);
        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onPagerChange    = this.onPagerChange.bind(this);
        this.onDateChange     = this.onDateChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date,
            month: nextProps.date
        });
    }

    /**
     * 格式化日期对象
     *
     * @param  {string} value 日期字符串
     * @return {Date}         转化后的日期对象
     * @private
     */
    parseValue(value) {

        return this.parseDate(value);
    }

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
            return value;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.format(rawValue, format, this.props.lang);
    }

    parseDate(date) {

        if (!_.isString(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    }

    /**
     * 点击textbox时触发
     *
     * @private
     */
    onInputFocus() {

        if (this.props.disabled || this.props.readOnly) {
            return;
        }

        this.setState({open: true, mode: 'main'}, function () {

            let onShow = this.props.onShow;

            if (_.isFunction(onShow)) {
                onShow({
                    target: this
                });
            }
        });
    }

    /**
     * Calendar DialogCalendar隐藏时触发
     *
     * @private
     */
    onHide() {

        this.setState({open: false}, function () {

            let onHide = this.props.onHide;

            if (_.isFunction(onHide)) {
                onHide({
                    target: this
                });
            }
        })
    }

    /**
     * rawValue 在Calendar Dialog上点击确定或取消按钮触发
     *
     * @param  {Object} e 事件对象
     * @param  {Date}   e.date 改变的日期
     * @param  {Object} e.target CalendarDialog对象
     * @private
     */
    onConfirm(e) {

        let date = this.state.date;
        let value = e.value;

        if (!value || DateTime.isEqualDate(date, this.state.rawValue)) {
            this.setState({open: false});
            return;
        }


        this.setState({rawValue: date, open: false}, function () {

            // 生成事件
            let e = {
                type: 'change',
                target: this,
                value: this.stringifyValue(date),
                rawValue: date
            };

            super.onChange(e);

            let onChange = this.props.onChange;

            if (_.isFunction(onChange)) {
                onChange(e);
            }
        })
    }

    onHeaderClick(e) {
        let mode = this.state.mode;

        this.setState({mode: mode === 'main' ? 'year' : 'main'});
    }

    onSelectorChange(e) {

        let {
            mode,
            date
        } = e;

        let {
            max,
            min
        } = this.props;

        min = this.parseDate(min);
        max = this.parseDate(max);

        mode = mode === 'year' ? 'month' : 'main';

        if (_.isDate(min) && DateTime.isBeforeDate(date, min)) {
            date = min;
        }
        else if (_.isDate(max) && DateTime.isAfterDate(date, max)) {
            date = max;
        }

        this.setState({
            date: date,
            month: date,
            mode: mode
        });
    }

    onPagerChange(e) {

        let month = e.month;

        this.setState({
            month: month
        });

    }

    onDateChange(e) {

        let date = e.date;

        let autoOk = this.props.autoOk;

        this.setState({
            date: date,
            month: date
        }, function () {
            if (autoOk) {
                this.onConfirm({
                    value: true
                });
            }
        });
    }

    render() {

        let props = this.props;

        let {
            lang,
            placeholder,
            disabled,
            ...others
        } = props;

        return (
            <div {...others} className={this.getClassName()}>
                <TextBox
                    ref="input" readOnly
                    variants={['calendar']}
                    value={this.getValue()}
                    disabled={disabled}
                    placeholder={placeholder}
                    onFocus={this.onInputFocus} />
                {this.renderDialog()}
            </div>
        );

    }

    renderDialog() {

        let {
            date,
            mode,
            open
        } = this.state;

        let isMain = mode === 'main';

        return (
            <Confirm
                open={open}
                variants={['calendar']}
                onConfirm={this.onConfirm}
                size={this.props.size}
                buttonVariants={['secondery', 'calendar']} >
                <Header
                    date={date}
                    onClick={this.onHeaderClick} />
                {isMain
                    ? this.renderMain()
                    : this.renderSelector()
                }
            </Confirm>
        );
    }

    renderMain() {

        let {
            date,
            month
        } = this.state;

        let {
            lang,
            min,
            max
        } = this.props;

        min = this.parseDate(min);
        max = this.parseDate(max);

        return (
            <div className={this.getPartClassName('main')}>
                <Pager
                    minDate={min}
                    maxDate={max}
                    onChange={this.onPagerChange}
                    month={month} />
                <Month
                    minDate={min}
                    maxDate={max}
                    lang={lang}
                    month={month}
                    date={date}
                    onChange={this.onDateChange} />
            </div>
        );
    }

    renderSelector() {

        let {
            date,
            mode
        } = this.state;

        let {
            min,
            max
        } = this.props;

        min = this.parseDate(min);
        max = this.parseDate(max);

        return (
            <Selector
                date={date}
                minDate={min}
                maxDate={max}
                mode={mode}
                onChange={this.onSelectorChange} />
        );

    }

}

Calendar.LANG = {

    // 对于 '周' 的称呼
    week: '周',

    // 星期对应的顺序表示
    days: '日,一,二,三,四,五,六'

};

Calendar.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
    dateFormat: 'yyyy-MM-dd',
    lang: Calendar.LANG,
    validateEvents: ['change']
};

Calendar.propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    rawValue: PropTypes.object,
    value: PropTypes.string,
    autoOk: PropTypes.bool,
    dateFormat: PropTypes.string,
    max: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    min: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    onHide: PropTypes.func,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    placeholder: PropTypes.string,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    })
};

module.exports = Calendar;
