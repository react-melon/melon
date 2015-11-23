/**
 * @file melon/CalendarPanel
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const {PropTypes} = React;

const cx = require('../common/util/cxBuilder').create('CalendarPanel');
const Header = require('./Header');
const Selector = require('./Selector');
const Pager = require('./Pager');
const Month = require('./Month');
const DateTime = require('../common/util/date');

const CalendarPanel = React.createClass({

    displayName: 'CaneldarPanel',

    getInitialState() {
        return {
            selectorType: 'main',
            month: this.props.date
        };
    },

    componentWillReceiveProps(nextProps) {

        const {date} = nextProps;

        if (this.props.date !== date) {
            this.setState({
                date: date
            });
        }

    },

    onHeaderClick(e) {

        const {selectorType} = this.state;

        this.setState({
            selectorType: selectorType === 'main' ? 'year' : 'main'
        });

    },

    onSelectorChange(e) {

        let {
            mode,
            date
        } = e;

        const {
            end,
            begin
        } = this.props;

        mode = mode === 'year' ? 'month' : 'main';

        if (begin && DateTime.isBeforeDate(date, begin)) {
            date = begin;
        }
        else if (end && DateTime.isAfterDate(date, end)) {
            date = end;
        }

        this.setState({
            date: date,
            month: date,
            selectorType: mode
        });

    },

    onPagerChange(e) {

        let month = e.month;

        this.setState({
            month: month
        });

    },

    onDateChange(e) {

        this.props.onChange({
            value: e.date
        });

    },

    render() {

        const {
            date,
            lang,
            begin,
            end
        } = this.props;

        const {selectorType, month} = this.state;

        return (
            <div className={cx(this.props).build()}>
                <Header
                    date={date}
                    onClick={this.onHeaderClick} />
                <div className={cx().part('main').build()}>
                    <Pager
                        minDate={begin}
                        maxDate={end}
                        onChange={this.onPagerChange}
                        month={month} />
                    <Month
                        minDate={begin}
                        maxDate={end}
                        lang={lang}
                        month={month}
                        date={date}
                        onChange={this.onDateChange} />
                    <Selector
                        style={{display: selectorType === 'main' ? 'none' : null}}
                        date={date}
                        mode={selectorType === 'year' ? 'year' : 'month'}
                        minDate={begin}
                        maxDate={end}
                        onChange={this.onSelectorChange} />
                </div>
            </div>
        );

    }

});

CalendarPanel.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
};

module.exports = CalendarPanel;
