define('melon/calendar/Day', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    '../common/util/date',
    './ItemMixin'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CalendarDay');
    var DateTime = require('../common/util/date');
    var ItemMixin = require('./ItemMixin');
    var PropTypes = React.PropTypes;
    var CalendarDay = React.createClass({
        displayName: 'CalendarDay',
        mixins: [ItemMixin],
        render: function () {
            var _props = this.props;
            var date = _props.date;
            var selected = _props.selected;
            var others = babelHelpers.objectWithoutProperties(_props, [
                'date',
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
        date: PropTypes.instanceOf(Date).isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        selected: PropTypes.bool
    };
    module.exports = CalendarDay;
});