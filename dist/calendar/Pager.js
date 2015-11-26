define('melon/calendar/Pager', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    '../Icon',
    'underscore',
    '../common/util/date'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CalendarPager');
    var Icon = require('../Icon');
    var _ = require('underscore');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarPager = React.createClass({
        displayName: 'CalendarPager',
        render: function () {
            var _props = this.props;
            var maxDate = _props.maxDate;
            var minDate = _props.minDate;
            var month = _props.month;
            var m = month.getMonth() + 1;
            var y = month.getFullYear();
            var beforeState = { disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate) };
            var nextState = { disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate) };
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement(Icon, {
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
            }), y + ' \u5E74 ' + m + ' \u6708');
        },
        onClick: function (e) {
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
    });
    CalendarPager.propTypes = {
        month: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func
    };
    module.exports = CalendarPager;
});