define('melon/calendar/Panel', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    './Header',
    './Selector',
    './Pager',
    './Month',
    '../common/util/date'
], function (require, exports, module) {
    var React = require('react');
    var PropTypes = React.PropTypes;
    var cx = require('../common/util/cxBuilder').create('CalendarPanel');
    var Header = require('./Header');
    var Selector = require('./Selector');
    var Pager = require('./Pager');
    var Month = require('./Month');
    var DateTime = require('../common/util/date');
    var CalendarPanel = React.createClass({
        displayName: 'CaneldarPanel',
        getInitialState: function () {
            return {
                selectorType: 'main',
                month: this.props.date,
                date: this.props.date
            };
        },
        componentWillReceiveProps: function (nextProps) {
            var date = nextProps.date;
            if (this.props.date !== date) {
                this.setState({
                    date: date,
                    month: date
                });
            }
        },
        onHeaderClick: function (e) {
            var selectorType = this.state.selectorType;
            this.setState({ selectorType: selectorType === 'main' ? 'year' : 'main' });
        },
        onSelectorChange: function (e) {
            var mode = e.mode;
            var date = e.date;
            var _props = this.props;
            var end = _props.end;
            var begin = _props.begin;
            mode = mode === 'year' ? 'month' : 'main';
            if (begin && DateTime.isBeforeDate(date, begin)) {
                date = begin;
            } else if (end && DateTime.isAfterDate(date, end)) {
                date = end;
            }
            this.setState({
                date: date,
                month: date,
                selectorType: mode
            });
        },
        onPagerChange: function (e) {
            var month = e.month;
            this.setState({ month: month });
        },
        onDateChange: function (e) {
            this.props.onChange({ value: e.date });
        },
        render: function () {
            var _props2 = this.props;
            var date = _props2.date;
            var lang = _props2.lang;
            var begin = _props2.begin;
            var end = _props2.end;
            var _state = this.state;
            var selectorType = _state.selectorType;
            var month = _state.month;
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement(Header, {
                date: date,
                onClick: this.onHeaderClick
            }), React.createElement('div', { className: cx().part('main').build() }, React.createElement(Pager, {
                minDate: begin,
                maxDate: end,
                onChange: this.onPagerChange,
                month: month
            }), React.createElement(Month, {
                minDate: begin,
                maxDate: end,
                lang: lang,
                month: month,
                date: date,
                onChange: this.onDateChange
            }), React.createElement(Selector, {
                style: { display: selectorType === 'main' ? 'none' : null },
                date: date,
                mode: selectorType === 'year' ? 'year' : 'month',
                minDate: begin,
                maxDate: end,
                onChange: this.onSelectorChange
            })));
        }
    });
    CalendarPanel.propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        begin: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string,
            title: PropTypes.string
        }).isRequired
    };
    module.exports = CalendarPanel;
});