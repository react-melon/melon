define('melon/calendar/Day', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarDay = function (_Component) {
        babelHelpers.inherits(CalendarDay, _Component);
        function CalendarDay(props) {
            babelHelpers.classCallCheck(this, CalendarDay);
            babelHelpers.get(Object.getPrototypeOf(CalendarDay.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.type = 'calendar-day';
        }
        babelHelpers.createClass(CalendarDay, [
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    var _props = this.props;
                    var disabled = _props.disabled;
                    var selected = _props.selected;
                    if (nextProps.disabled !== disabled || nextProps.selected !== selected) {
                        return true;
                    }
                    return false;
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(CalendarDay.prototype), 'getStates', this).call(this, props);
                    states.selected = props.selected;
                    return states;
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(CalendarDay.prototype), 'getVariants', this).call(this, props);
                    var date = props.date;
                    if (DateTime.isEqualDate(date, new Date())) {
                        variants.push('today');
                    }
                    return variants;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var date = props.date;
                    var onClick = props.onClick;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'date',
                        'onClick'
                    ]);
                    return React.createElement('a', babelHelpers._extends({}, others, {
                        className: this.getClassName(),
                        href: '#',
                        onClick: this.onClick
                    }), date.getDate());
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    e.preventDefault();
                    var _props2 = this.props;
                    var disabled = _props2.disabled;
                    var onClick = _props2.onClick;
                    var date = _props2.date;
                    if (disabled) {
                        return;
                    }
                    if (onClick) {
                        onClick({
                            target: this,
                            date: date
                        });
                    }
                }
            }
        ]);
        return CalendarDay;
    }(Component);
    CalendarDay.propTypes = {
        date: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        selected: PropTypes.bool
    };
    module.exports = CalendarDay;
});