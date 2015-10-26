/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var Icon = require('./Icon');
var Header = require('./calendar/Header');
var Month = require('./calendar/Month');
var Selector = require('./calendar/Selector');
var Pager = require('./calendar/Pager');
var Confirm = require('./dialog/Confirm');

var DateTime = require('./common/util/date');
var _ = require('underscore');
var PropTypes = React.PropTypes;

class Calendar extends InputComponent {

    static displayName = 'Calendar';

    constructor(props) {

        super(props);

        let rawValue = this.state.rawValue;

        let {
            begin,
            end
        } = props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        rawValue = _.isDate(begin) && DateTime.isAfterDate(begin, rawValue) ? begin : rawValue;
        rawValue = _.isDate(end) && DateTime.isBeforeDate(end, rawValue) ? end : rawValue;

        let open = false;
        let month = rawValue;
        let mode = 'main';
        let date = rawValue;

        this.state = {
            ...this.state,
            open,
            month,
            mode,
            date
        };

        this.onLabelClick     = this.onLabelClick.bind(this);
        this.onHide           = this.onHide.bind(this);
        this.onConfirm        = this.onConfirm.bind(this);
        this.onHeaderClick    = this.onHeaderClick.bind(this);
        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onPagerChange    = this.onPagerChange.bind(this);
        this.onDateChange     = this.onDateChange.bind(this);

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
            return rawValue;
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

    getStates(props) {
        let states = super.getStates(props);

        states.focus = this.state.open;

        return states;
    }

    /**
     * 点击textbox时触发
     *
     * @private
     */
    onLabelClick() {

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
        });
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
        });
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
            end,
            begin
        } = this.props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        mode = mode === 'year' ? 'month' : 'main';

        if (_.isDate(begin) && DateTime.isBeforeDate(date, begin)) {
            date = begin;
        }
        else if (_.isDate(end) && DateTime.isAfterDate(date, end)) {
            date = end;
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
            size,
            ...others
        } = props;

        return (
            <div {...others} className={this.getClassName()}>
                <input
                    ref="input"
                    type="hidden"
                    value={this.getValue()}
                    disabled={disabled}
                    size={size}
                    placeholder={placeholder} />
                {this.renderLabel()}
                {this.renderDialog()}
            </div>
        );

    }

    renderLabel() {

        let rawValue = this.state.rawValue;
        let format = this.props.dateFormat.toLowerCase();

        return (
            <label onClick={this.onLabelClick}>
                {DateTime.format(rawValue, format, this.props.lang)}
                <Icon icon='expand-more' />
            </label>
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
            begin,
            end
        } = this.props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        return (
            <div className={this.getPartClassName('main')}>
                <Pager
                    minDate={begin}
                    maxDate={end}
                    onChange={this.onPagerChange}
                    month={month} />
                <Month
                    minDate={begin}
                    maxDate={end}
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
            begin,
            end
        } = this.props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        return (
            <Selector
                date={date}
                minDate={begin}
                maxDate={end}
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
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    begin: PropTypes.oneOfType([
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
