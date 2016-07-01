/**
 * @file Calendar/CalendarDay
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import * as DateTime from '../common/util/date';
import Item from './Item';

const cx = create('CalendarDay');

export default class CalendarDay extends Item {

    render() {

        const {
            date,
            selected,
            ...others
        } = this.props;

        const className = cx(this.props)
            .addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null)
            .addStates({selected})
            .build();

        return (
            <a
                {...others}
                className={className}
                href="#"
                onClick={this.onClick} >
                {date.getDate()}
            </a>
        );

    }

}

CalendarDay.displayName = 'CalendarDay';

CalendarDay.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
};
