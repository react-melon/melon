/**
 * @file esui-react/RangeCalendar
 * @author cxtom <cxtom2010@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var Calendar = require('./Calendar');
var TextBox = require('./TextBox');
var Header = require('./calendar/Header');
var Month = require('./calendar/Month');
var Selector = require('./calendar/Selector');
var Pager = require('./calendar/Pager');
var Confirm = require('./dialog/Confirm');


var DateTime = require('./common/util/date');
var _ = require('underscore');
var PropTypes = React.PropTypes;


class RangeCalendar extends InputComponent {

    constructor(props) {

        super(props);

        let rawValue = this.state.rawValue;

        this.state = {
            ...this.state,
            open: false,
            month: _.clone(rawValue),
            date: rawValue,
            mode: ['main', 'main']
        };

        this.onInputFocus     = this.onInputFocus.bind(this);
        this.onHide           = this.onHide.bind(this);
        this.onConfirm        = this.onConfirm.bind(this);

    }

    onHeaderClick(index, e) {

        let mode = this.state.mode;

        mode[index] = mode[index] === 'main' ? 'year' : 'main';

        this.setState({mode: mode});
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

        this.setState({open: true, mode: ['main', 'main']}, function () {

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

    onDateChange(index, e) {

        let newDate = e.date;

        let date = _.clone(this.state.date);

        date[index] = newDate;

        this.setState({
            date: date,
            month: date
        });
    }

    onPagerChange(index, e) {

        let newMonth = e.month;

        let month = _.clone(this.state.month);

        month[index] = newMonth;

        this.setState({
            month: month
        });

    }

    onSelectorChange(index, e) {

        let {
            mode,
            date
        } = this.state;

        let {
            max,
            min
        } = this.props;

        min = index === 0 ? this.parseDate(min) : date[0];
        max = index === 0 ? date[1] : this.parseDate(max);

        mode[index] = e.mode === 'year' ? 'month' : 'main';

        if (_.isDate(min) && DateTime.isBeforeDate(e.date, min)) {
            date[index] = min;
        }
        else if (_.isDate(max) && DateTime.isAfterDate(e.date, max)) {
            date[index] = max;
        }
        else {
            date[index] = e.date;
        }

        this.setState({
            date: date,
            month: date,
            mode: mode
        });
    }

    onConfirm(e) {

        let dates = this.state.date;
        let value = e.value;

        if (!value || (
                DateTime.isEqualDate(dates[0], this.state.rawValue[0])
                && DateTime.isEqualDate(dates[1], this.state.rawValue[1])
            )
        ) {
            this.setState({open: false});
            return;
        }


        this.setState({rawValue: dates, open: false}, function () {

            // 生成事件
            let e = {
                type: 'change',
                target: this,
                value: this.stringifyValue(dates),
                rawValue: dates
            };

            super.onChange(e);

            let onChange = this.props.onChange;

            if (_.isFunction(onChange)) {
                onChange(e);
            }
        })
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

        value = value.split(' ');

        return [
            DateTime.parse(value[0], format),
            DateTime.parse(value[2], format)
        ];
    }

    parseDate(date) {

        if (!_.isString(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
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

        if (!_.isArray(rawValue)) {
            return value;
        }

        let format = this.props.dateFormat.toLowerCase();

        return [
            DateTime.format(rawValue[0], format, this.props.lang),
            '至',
            DateTime.format(rawValue[1], format, this.props.lang)
        ].join(' ')
    }


    renderDialog() {

        let {
            date,
            month,
            mode,
            open
        } = this.state;

        return (
            <Confirm
                open={open}
                variants={['calendar']}
                onConfirm={this.onConfirm}
                size={this.props.size}
                buttonVariants={['secondery', 'calendar']} >
                    <div className={this.getPartClassName('row')}>
                        <Header
                            date={date[0]}
                            onClick={this.onHeaderClick.bind(this, 0)} />
                        <Header
                            date={date[1]}
                            onClick={this.onHeaderClick.bind(this, 1)} />
                    </div>
                    <div className={this.getPartClassName('row')}>
                        {mode[0] === 'main'
                            ? this.renderMain(0)
                            : this.renderSelector(0)}
                        {mode[1] === 'main'
                            ? this.renderMain(1)
                            : this.renderSelector(1)}
                    </div>
            </Confirm>
        );
    }

    renderMain(index) {

        let {
            date,
            month
        } = this.state;

        let {
            lang,
            min,
            max
        } = this.props;

        min = index === 0 ? this.parseDate(min) : date[0];
        max = index === 0 ? date[1] : this.parseDate(max);

        return (
            <div className={this.getPartClassName('main')}>
                <Pager
                    minDate={min}
                    maxDate={max}
                    onChange={this.onPagerChange.bind(this, index)}
                    month={month[index]} />
                <Month
                    minDate={min}
                    maxDate={max}
                    lang={lang}
                    month={month[index]}
                    date={date[index]}
                    onChange={this.onDateChange.bind(this, index)} />
            </div>
        );
    }

    renderSelector(index) {

        let {
            date,
            mode
        } = this.state;

        let {
            min,
            max
        } = this.props;

        min = index === 0 ? this.parseDate(min) : date[0];
        max = index === 0 ? date[1] : this.parseDate(max);

        return (
            <div className={this.getPartClassName('main')}>
                <Selector
                    date={date[index]}
                    minDate={min}
                    maxDate={max}
                    mode={mode[index]}
                    onChange={this.onSelectorChange.bind(this, index)} />
            </div>
        );

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


}

RangeCalendar.defaultProps = {
    ...Calendar.defaultProps,
    defaultValue: [
        DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
        '至',
        DateTime.format(DateTime.addMonths(new Date(), 1), 'yyyy-mm-dd', Calendar.LANG)
    ].join(' ')
};


RangeCalendar.propTypes = {
    ...Calendar.propTypes,
    rawValue: PropTypes.arrayOf(PropTypes.object),
    autoOk: PropTypes.bool,
    dateFormat: PropTypes.string,
    max: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    min: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

module.exports = RangeCalendar;
