define('melon/calendar/SelectorItem', [
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
    var CalendarSelectorItem = function (_Component) {
        babelHelpers.inherits(CalendarSelectorItem, _Component);
        function CalendarSelectorItem(props) {
            babelHelpers.classCallCheck(this, CalendarSelectorItem);
            babelHelpers.get(Object.getPrototypeOf(CalendarSelectorItem.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.type = 'calendar-selector-item';
        }
        babelHelpers.createClass(CalendarSelectorItem, [
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
                    var states = babelHelpers.get(Object.getPrototypeOf(CalendarSelectorItem.prototype), 'getStates', this).call(this, props);
                    states.selected = props.selected;
                    return states;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var date = props.date;
                    var onClick = props.onClick;
                    var mode = props.mode;
                    var disabled = props.disabled;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'date',
                        'onClick',
                        'mode',
                        'disabled'
                    ]);
                    return React.createElement('li', babelHelpers._extends({}, others, {
                        onClick: disabled ? null : this.onClick,
                        'data-mode': mode,
                        'data-value': date,
                        className: this.getClassName()
                    }), React.createElement('a', { href: '#' }, mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)));
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
            }
        ]);
        return CalendarSelectorItem;
    }(Component);
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