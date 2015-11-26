define('melon/calendar/SelectorItem', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    './ItemMixin',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CalendarSelectorItem');
    var ItemMixin = require('./ItemMixin');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarSelectorItem = React.createClass({
        displayName: 'CalendarSelectorItem',
        mixins: [ItemMixin],
        render: function () {
            var props = this.props;
            var date = props.date;
            var mode = props.mode;
            var disabled = props.disabled;
            var selected = props.selected;
            var others = babelHelpers.objectWithoutProperties(props, [
                'date',
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