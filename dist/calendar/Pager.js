define('melon/calendar/Pager', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    '../Icon',
    'underscore',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Icon = require('../Icon');
    var _ = require('underscore');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarPager = function (_Component) {
        babelHelpers.inherits(CalendarPager, _Component);
        function CalendarPager(props) {
            babelHelpers.classCallCheck(this, CalendarPager);
            babelHelpers.get(Object.getPrototypeOf(CalendarPager.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.type = 'calendar-pager';
        }
        babelHelpers.createClass(CalendarPager, [
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var maxDate = _props.maxDate;
                    var minDate = _props.minDate;
                    var month = _props.month;
                    var m = month.getMonth() + 1;
                    var y = month.getFullYear();
                    var beforeState = { disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate) };
                    var nextState = { disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate) };
                    return React.createElement('div', { className: this.getClassName() }, React.createElement(Icon, {
                        icon: 'navigate-before',
                        'data-role': 'pager',
                        states: beforeState,
                        'data-action': 'prev',
                        onClick: beforeState.disabled ? null : this.onClick
                    }), React.createElement(Icon, {
                        icon: 'navigate-next',
                        'data-role': 'pager',
                        states: nextState,
                        'data-action': 'next',
                        onClick: nextState.disabled ? null : this.onClick
                    }), y + ' \u5E74 ' + m + ' \u6708 ');
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    var target = e.currentTarget;
                    var month = this.props.month;
                    var action = target.getAttribute('data-action');
                    var newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);
                    var onChange = this.props.onChange;
                    if (onChange) {
                        onChange({
                            target: this,
                            month: newMonth
                        });
                    }
                }
            }
        ]);
        return CalendarPager;
    }(Component);
    CalendarPager.propTypes = {
        month: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func
    };
    module.exports = CalendarPager;
});