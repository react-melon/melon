/**
 * @file esui-react/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var InputComponent = require('./InputComponent.jsx');
var DateTime = require('./common/util/date');
var TextBox = require('./TextBox.jsx');
var CalendarDialog = require('./calendar/CalendarDialog.jsx');
var _ = require('underscore');
var PropTypes = React.PropTypes;

class Calendar extends InputComponent {

    constructor(props) {

        super(props);

        var open = false;

        this.state = {
            ...this.state,
            open
        };

        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date,
            month: nextProps.month
        });
    }

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

        return DateTime.format(rawValue, format);
    }

    handleInputFocus() {
        this.setState({open: true}, function () {

            let onShow = this.props.onShow;

            if (_.isFunction(onShow)) {
                onShow({
                    target: this
                });
            }
        });
    }

    handleDialogHide() {
        this.setState({open: false}, function () {

            let onHide = this.props.onHide;

            if (_.isFunction(onHide)) {
                onHide({
                    target: this
                });
            }
        })
    }

    handleOnChange(e) {

        let date = e.date;

        if (DateTime.isEqualDate(date, this.state.rawValue)) {
            this.setState({open: false});
            return;
        }

        this.setState({rawValue: date, open: false}, function () {

            // 生成事件
            var e = {
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

    render() {

        let props = this.props;

        let {
            lang,
            placeholder,
            ...others
        } = props

        return (
            <div {...others} className={this.getClassName()}>
                <TextBox
                    ref="input" readOnly
                    variants={['calendar']}
                    value={this.getValue()}
                    placeholder={placeholder}
                    onFocus={this.handleInputFocus} />
                <CalendarDialog
                    ref="dialogWindow"
                    open={this.state.open}
                    date={this.state.rawValue}
                    onHide={this.handleDialogHide}
                    minDate={this.parseValue(props.min)}
                    maxDate={this.parseValue(props.max)}
                    lang={lang}
                    onChange={this.handleOnChange}
                    showYearSelector={props.showYearSelector} />
            </div>
        );

    }

}

Calendar.defaultProps = {
    ...InputComponent.defaultProps,
    dateFormat: 'yyyy-MM-dd',
    showYearSelector: false,
    lang: {

        // 对于 '周' 的称呼
        week: '周',

        // 星期对应的顺序表示
        days: '日,一,二,三,四,五,六',

        // 每月显示的标题文字
        title: '{year}年{month}月'

    },
    validateEvents: ['change']
};

Calendar.propTypes = {
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
    showYearSelector: PropTypes.bool,
    placeholder: PropTypes.string,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string,
        title: PropTypes.string
    })
};

module.exports = Calendar;
