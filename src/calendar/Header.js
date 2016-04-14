/**
 * @file Calendar/CalendarHeader
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import * as DateTime from '../common/util/date';
import {create} from '../common/util/cxBuilder';

const cx = create('CalendarHeader');

export default function CalendarHeader(props) {

    const {
        date,
        ...rest
    } = props;

    const year = date.getFullYear();

    const week = DateTime.getDayOfWeek(date);
    const month = DateTime.getShortMonth(date);
    const day = date.getDate();

    const fullDate = month + day + '日';

    return (
        <div
            {...rest}
            className={cx(props).build()}>
            <p className={cx().part('year').build()}>{year}</p>
            <p className={cx().part('week').build()}>{week}</p>
            <p className={cx().part('date').build()}>{fullDate}</p>
        </div>
    );

}

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
    date: PropTypes.object.isRequired
};
