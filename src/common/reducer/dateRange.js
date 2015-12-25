/**
 * @file common/reducer/dateRange
 * @author leon(ludafa@outlook.com)
 */

let moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD';

const DEFAULT_END_DATE = moment().subtract(1, 'days');
const DEFAULT_START_DATE = moment().subtract(1, 'years');

function normalize(date, fallback) {
    date = moment(date, DATE_FORMAT);
    return date.isValid() ? date : fallback;
}

module.exports = (
    {startDate, endDate},
    rangeStart = DEFAULT_START_DATE,
    rangeEnd = DEFAULT_END_DATE
) => {

    startDate = normalize(startDate, rangeStart);
    endDate = normalize(endDate, rangeEnd);

    if (startDate.isAfter(endDate)) {
        let cache = endDate;
        endDate = startDate;
        startDate = cache;
    }

    if (startDate.isBefore(rangeStart)) {
        startDate = rangeStart;
    }

    if (endDate.isAfter(rangeEnd)) {
        endDate = rangeEnd;
    }

    return {
        startDate: startDate.format(DATE_FORMAT),
        endDate: endDate.format(DATE_FORMAT)
    };

};
