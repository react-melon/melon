/**
 * @file esui-react/RangeCalendar
 * @author cxtom <cxtom2010@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var Calendar = require('./Calendar');
var Icon = require('./Icon');
var Header = require('./calendar/Header');
var Month = require('./calendar/Month');
var Selector = require('./calendar/Selector');
var Pager = require('./calendar/Pager');
var Confirm = require('./dialog/Confirm');


var DateTime = require('./common/util/date');
var _ = require('underscore');
var PropTypes = React.PropTypes;


class RangeCalendar extends InputComponent {

    static displayName = 'RangeCalendar';

    constructor(props) {

        super(props);

        let rawValue = this.state.rawValue;

        let {
            begin,
            end
        } = props;

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        rawValue[0] = _.isDate(begin) && DateTime.isAfterDate(begin, rawValue[0]) ? begin : rawValue[0];
        rawValue[1] = _.isDate(end) && DateTime.isBeforeDate(end, rawValue[1]) ? end : rawValue[0];

        this.state = {
            ...this.state,
            open: false,
            month: _.clone(rawValue),
            date: rawValue,
            mode: ['main', 'main']
        };

        this.onLabelClick     = this.onLabelClick.bind(this);
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
    onLabelClick() {

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
        });
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
            end,
            begin
        } = this.props;

        begin = index === 0 ? this.parseDate(begin) : date[0];
        end = index === 0 ? date[1] : this.parseDate(end);

        mode[index] = e.mode === 'year' ? 'month' : 'main';

        if (_.isDate(begin) && DateTime.isBeforeDate(e.date, begin)) {
            date[index] = begin;
        }
        else if (_.isDate(end) && DateTime.isAfterDate(e.date, end)) {
            date[index] = end;
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

        value = value.split(',');

        return [
            DateTime.parse(value[0], format),
            DateTime.parse(value[1], format)
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
            return rawValue;
        }

        let format = this.props.dateFormat.toLowerCase();

        return [
            DateTime.format(rawValue[0], format, this.props.lang),
            ',',
            DateTime.format(rawValue[1], format, this.props.lang)
        ].join('');
    }

    getStates(props) {
        let states = super.getStates(props);

        states.focus = this.state.open;

        return states;
    }


    renderDialog() {

        let {
            date,
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
            begin,
            end
        } = this.props;

        begin = index === 0 ? this.parseDate(begin) : date[0];
        end = index === 0 ? date[1] : this.parseDate(end);

        return (
            <div className={this.getPartClassName('main')}>
                <Pager
                    minDate={begin}
                    maxDate={end}
                    onChange={this.onPagerChange.bind(this, index)}
                    month={month[index]} />
                <Month
                    minDate={begin}
                    maxDate={end}
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
            begin,
            end
        } = this.props;

        begin = index === 0 ? this.parseDate(begin) : date[0];
        end = index === 0 ? date[1] : this.parseDate(end);

        return (
            <div className={this.getPartClassName('main')}>
                <Selector
                    date={date[index]}
                    minDate={begin}
                    maxDate={end}
                    mode={mode[index]}
                    onChange={this.onSelectorChange.bind(this, index)} />
            </div>
        );

    }

    renderLabel() {

        let rawValue = this.state.rawValue;

        let format = this.props.dateFormat.toLowerCase();

        let str = [
            DateTime.format(rawValue[0], format, this.props.lang),
            ' 至 ',
            DateTime.format(rawValue[1], format, this.props.lang)
        ].join(' ');

        return (
            <label onClick={this.onLabelClick}>
                {str}
                <Icon icon='expand-more' />
            </label>
        );
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
    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

module.exports = RangeCalendar;
