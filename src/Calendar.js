/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var TextBox = require('./TextBox');
var Header = require('./calendar/Header');
var Main = require('./calendar/Main');
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

        if (!_.isString(value)) {
            return value;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(value, format);
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

    /**
     * 点击textbox时触发
     *
     * @private
     */
    onInputFocus() {

        if (this.props.disabled || this.props.readOnly) {
            return;
        }

        this.setState({open: true}, function () {

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

        mode = mode === 'year' ? 'month' : 'main';

        this.setState({date: date, mode: mode});
    }

    onPagerChange(e) {

        let month = e.month;

        this.setState({month: month});

    }

    onDateChange(e) {

        let date = e.date;

        this.setState({date: date, month: date});
    }

    render() {

        let props = this.props;
        let state = this.state;

        let {
            lang,
            placeholder,
            disabled,
            ...others
        } = props;

        let {
            date,
            mode,
            open
        } = state;

        let isMain = mode === 'main';

        return (
            <div {...others} className={this.getClassName()}>
                <TextBox
                    ref="input" readOnly
                    variants={['calendar']}
                    value={this.getValue()}
                    disabled={disabled}
                    placeholder={placeholder}
                    onFocus={this.onInputFocus} />
                <Confirm
                    open={open}
                    variants={['calendar']}
                    onConfirm={this.onConfirm}
                    buttonVariants={['secondery', 'calendar']} >
                    <Header
                        date={date}
                        onClick={this.onHeaderClick} />
                    {isMain ? this.renderMain() : this.renderSelector()}
                </Confirm>
            </div>
        );

    }

    renderMain() {
        let {
            lang,
            min,
            max
        } = this.props;

        let {
            date,
            month
        } = this.state;

        return ([
            <Pager
                minDate={this.parseValue(min)}
                maxDate={this.parseValue(max)}
                key="pager"
                onChange={this.onPagerChange}
                month={month} />,
            <Main
                minDate={this.parseValue(min)}
                maxDate={this.parseValue(max)}
                key="main"
                lang={lang}
                month={month}
                date={date}
                onChange={this.onDateChange} />
        ]);
    }

    renderSelector() {

        let {
            min,
            max
        } = this.props;

        let {
            date,
            mode
        } = this.state;

        return (
            <Selector
                date={date}
                minDate={this.parseValue(min)}
                maxDate={this.parseValue(max)}
                mode={mode}
                onChange={this.onSelectorChange} />
        );

    }

}

var lang = {

    // 对于 '周' 的称呼
    week: '周',

    // 星期对应的顺序表示
    days: '日,一,二,三,四,五,六'

};

Calendar.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: DateTime.format(new Date(), 'yyyy-mm-dd', lang),
    dateFormat: 'yyyy-MM-dd',
    showYearSelector: false,
    lang: lang,
    validateEvents: ['change']
};

Calendar.propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    rawValue: PropTypes.object,
    value: PropTypes.string,
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
