define('melon/calendar/Day', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CalendarDay');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarDay = React.createClass({
        displayName: 'CalendarDay',
        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var disabled = _props.disabled;
            var selected = _props.selected;
            return nextProps.disabled !== disabled || nextProps.selected !== selected;
        },
        onClick: function onClick(e) {
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
        },
        render: function render() {
            var _props3 = this.props;
            var date = _props3.date;
            var onClick = _props3.onClick;
            var selected = _props3.selected;
            var others = babelHelpers.objectWithoutProperties(_props3, [
                'date',
                'onClick',
                'selected'
            ]);
            var className = cx(this.props).addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null).addStates({ selected: selected }).build();
            return React.createElement('a', babelHelpers._extends({}, others, {
                className: className,
                href: '#',
                onClick: this.onClick
            }), date.getDate());
        }
    });
    CalendarDay.propTypes = {
        date: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        selected: PropTypes.bool
    };
    module.exports = CalendarDay;
});