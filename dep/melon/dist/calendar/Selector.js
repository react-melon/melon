define('melon/calendar/Selector', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../common/util/cxBuilder',
    './SelectorItem',
    'underscore',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('../common/util/cxBuilder').create('CalendarSelector');
    var Item = require('./SelectorItem');
    var _ = require('underscore');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarSelector = React.createClass({
        displayName: 'CalendarSelector',
        componentDidMount: function () {
            this.refs.item && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
        },
        componentDidUpdate: function () {
            this.refs.item && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
        },
        render: function () {
            var _props = this.props;
            var minDate = _props.minDate;
            var maxDate = _props.maxDate;
            var date = _props.date;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'minDate',
                'maxDate',
                'date'
            ]);
            var children = [];
            var y = date.getFullYear();
            var m = date.getMonth();
            var d = date.getDate();
            if (this.isMonthView()) {
                children = _.range(12).map(function (month, index) {
                    var newDate = new Date(y, month, d);
                    var disabled = _.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate) || _.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate);
                    var selected = month === m;
                    return React.createElement(Item, {
                        key: index,
                        mode: 'month',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: this.onClick,
                        disabled: disabled,
                        selected: selected
                    });
                }, this);
            } else {
                var range = CalendarSelector.MAX_RANGE;
                _.range(y - range, y + range).forEach(function (year, index) {
                    if (_.isDate(minDate) && year < minDate.getFullYear() || _.isDate(maxDate) && year > maxDate.getFullYear()) {
                        return;
                    }
                    var newDate = new Date(year, m, d);
                    var selected = year === y;
                    children.push(React.createElement(Item, {
                        key: index,
                        mode: 'year',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: this.onClick,
                        selected: selected
                    }));
                }, this);
            }
            return React.createElement('ul', babelHelpers._extends({}, rest, { className: cx(this.props).build() }), children);
        },
        onClick: function (e) {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange({
                    target: this,
                    mode: e.mode,
                    date: e.date
                });
            }
        },
        isMonthView: function () {
            var _props2 = this.props;
            var minDate = _props2.minDate;
            var maxDate = _props2.maxDate;
            var mode = _props2.mode;
            var onlyOneYear = false;
            if (mode === 'year' && _.isDate(minDate) && _.isDate(maxDate)) {
                onlyOneYear = DateTime.yearDiff(minDate, maxDate) === 0;
            }
            return mode === 'month' || onlyOneYear;
        }
    });
    CalendarSelector.MAX_RANGE = 10;
    CalendarSelector.propTypes = {
        date: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func,
        mode: PropTypes.oneOf([
            'month',
            'year'
        ])
    };
    module.exports = CalendarSelector;
});