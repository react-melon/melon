/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var createControl = require('./common/util/createControl');
var DateTime = require('./common/util/date');
var TextBox = require('./TextBox.jsx');
var CalendarDialog = require('./calendar/CalendarDialog.jsx');
var _ = require('underscore');
var PropTypes = React.PropTypes;

var Calendar = React.createClass({

    statics: {
        type: 'Calendar'
    },

    propTypes: {
        defaultDate: PropTypes.object,
        value: PropTypes.object,
        dateFormat: PropTypes.string,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onHide: PropTypes.func,
        onChange: PropTypes.func,
        onShow: PropTypes.func,
        showYearSelector: PropTypes.bool,
        placeholder: PropTypes.string,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string,
            title: PropTypes.string
        })
    },

    getInitialState: function () {

        var value = this.isControlled() ? null : this.props.defaultDate;

        return {
            value: value,
            isOpen: false
        };

    },

    getDefaultProps: function () {
        return {
            dateFormat: 'yyyy-MM-dd',
            showYearSelector: false,
            lang: {

                // 对于 '周' 的称呼
                week: '周',

                // 星期对应的顺序表示
                days: '日,一,二,三,四,五,六',

                // 每月显示的标题文字
                title: '{year}年{month}月'

            }
        };
    },

    componentWillReceiveProps: function (nextProps) {

        var value = this.isControlled() ? null : this.props.defaultDate;

        this.setState({
            value: value
        });
    },

    getValue: function () {
        var date = this.isControlled() ? this.props.value : this.state.value;
        return this.format(date);
    },

    isControlled: function () {
        var props = this.props;
        return props.readOnly || props.disabled || props.value != null && !!props.onChange;
    },

    getControlledDate: function () {
        var props = this.props;
        if (_.isDate(props.value)) {
            return props.value;
        }
    },

    /**
     * 格式化日期
     *
     * @param {Date} date 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的dateFormat
     * @return {string} 格式化后的日期字符串
     * @public
     */
    format: function (date, format) {

        format = (format || this.props.dateFormat).toLowerCase();

        // if (lib.isString(date)) {
        //     date = this.parse(date);
        // }

        var weekStart = this.weekStart;
        var y         = date.getFullYear();
        var M         = date.getMonth() + 1;
        var d         = date.getDate();
        var week      = date.getDay();
        var props     = this.props;

        if (weekStart) {
            week = (week - 1 + 7) % 7;
        }

        week = props.lang.days.split(',')[week];

        var map = {
            yyyy: y,
            yy: y % 100,
            y: y,
            mm: DateTime.datePad(M),
            m: M,
            dd: DateTime.datePad(d),
            d: d,
            w: week,
            ww: props.lang.week + week
        };

        return format.replace(
            /y+|M+|d+|W+/gi,
            function ($0) {
                return map[$0] || '';
            }
        );
    },

    handleInputClick: function () {
        this.setState({isOpen: true}, function () {

            var onShow = this.props.onShow;

            if (_.isFunction(onShow)) {
                onShow({
                    target: this
                });
            }
        });
    },

    handleDialogHide: function () {
        this.setState({isOpen: false}, function () {

            var onHide = this.props.onHide;

            if (_.isFunction(onHide)) {
                onHide({
                    target: this
                });
            }
        })
    },

    handleOnChange: function (e) {
        if (DateTime.isEqualDate(e.value, this.state.value)) {
            this.setState({isOpen: false});
            return;
        }
        this.setState({value: e.value, isOpen: false}, function () {

            var onChange = this.props.onChange;

            if (_.isFunction(onChange)) {
                onChange({
                    target: this,
                    value: e.value
                });
            }
        })
    },

    render: function() {

        var props = this.props;
        var placeholder = props.placeholder;
        var lang = props.lang;

        props = _.omit(props, 'lang');

        return (
            <div {...props}>
                <TextBox
                    ref="input" readOnly
                    variants={['calendar']}
                    value={this.getValue()}
                    placeholder={placeholder}
                    onClick={this.handleInputClick} />
                <CalendarDialog
                    ref="dialogWindow"
                    isOpen={this.state.isOpen}
                    initialDate={this.state.value}
                    onHide={this.handleDialogHide}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    lang={lang}
                    onChange={this.handleOnChange}
                    showYearSelector={props.showYearSelector} />
            </div>
        );

    }

});

module.exports = createControl(Calendar);
