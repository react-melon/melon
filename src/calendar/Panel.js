/**
 * @file melon/CalendarPanel
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';

import Header from './Header';
import Selector from './Selector';
import Pager from './Pager';
import Month from './Month';

import * as DateTime from '../common/util/date';

const cx = create('CalendarPanel');

export default class CalendarPanel extends Component {

    constructor(props) {

        super(props);

        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onPagerChange = this.onPagerChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            selectorType: 'main',
            month: props.date
        };

    }

    componentWillReceiveProps(nextProps) {

        const {date} = nextProps;

        if (this.props.date !== date) {
            this.setState({date});
        }

    }

    onHeaderClick(e) {

        const {selectorType} = this.state;

        this.setState({
            selectorType: selectorType === 'main' ? 'year' : 'main'
        });

    }

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

    }

    onPagerChange(e) {

        let month = e.month;

        this.setState({month});

    }

    onDateChange(e) {

        this.props.onChange({
            value: e.date
        });

    }

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

}

CalendarPanel.displayName = 'CalendarPanel';

CalendarPanel.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
};