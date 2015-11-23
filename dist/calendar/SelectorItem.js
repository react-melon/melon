define('melon/calendar/SelectorItem', [
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
    var cx = require('../common/util/cxBuilder').create('CalendarSelectorItem');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarSelectorItem = React.createClass({
        displayName: 'CalendarSelectorItem',
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            var _props = this.props;
            var disabled = _props.disabled;
            var selected = _props.selected;
            if (nextProps.disabled !== disabled || nextProps.selected !== selected) {
                return true;
            }
            return false;
        },
        render: function render() {
            var props = this.props;
            var date = props.date;
            var onClick = props.onClick;
            var mode = props.mode;
            var disabled = props.disabled;
            var selected = props.selected;
            var others = babelHelpers.objectWithoutProperties(props, [
                'date',
                'onClick',
                'mode',
                'disabled',
                'selected'
            ]);
            return React.createElement('li', babelHelpers._extends({}, others, {
                'data-mode': mode,
                'data-value': date,
                onClick: disabled ? null : this.onClick,
                className: cx(props).addStates({ selected: selected }).build()
            }), React.createElement('span', null, mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)));
        },
        onClick: function onClick(e) {
            e.preventDefault();
            var _props2 = this.props;
            var disabled = _props2.disabled;
            var onClick = _props2.onClick;
            var date = _props2.date;
            var mode = _props2.mode;
            if (disabled) {
                return;
            }
            if (onClick) {
                onClick({
                    target: this,
                    date: date,
                    mode: mode
                });
            }
        }
    });
    CalendarSelectorItem.propTypes = {
        date: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        mode: PropTypes.oneOf([
            'month',
            'year'
        ])
    };
    module.exports = CalendarSelectorItem;
});