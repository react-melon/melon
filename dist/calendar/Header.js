define('melon/calendar/Header', [
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
    var CalendarHeader = function (_Component) {
        babelHelpers.inherits(CalendarHeader, _Component);
        function CalendarHeader(props) {
            babelHelpers.classCallCheck(this, CalendarHeader);
            babelHelpers.get(Object.getPrototypeOf(CalendarHeader.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.type = 'calendar-header';
        }
        babelHelpers.createClass(CalendarHeader, [
            {
                key: 'render',
                value: function render() {
                    var date = this.props.date;
                    var year = date.getFullYear();
                    var week = DateTime.getDayOfWeek(date);
                    var month = DateTime.getShortMonth(date);
                    var day = date.getDate();
                    var fullDate = month + day + '\u65E5';
                    return React.createElement('div', {
                        className: this.getClassName('header'),
                        onClick: this.onClick
                    }, React.createElement('p', { className: this.getPartClassName('year') }, year), React.createElement('p', { className: this.getPartClassName('week') }, week), React.createElement('p', { className: this.getPartClassName('date') }, fullDate));
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    var onClick = this.props.onClick;
                    if (onClick) {
                        onClick({ target: this });
                    }
                }
            }
        ]);
        return CalendarHeader;
    }(Component);
    CalendarHeader.propTypes = {
        date: PropTypes.object.isRequired,
        onClick: PropTypes.func
    };
    module.exports = CalendarHeader;
});