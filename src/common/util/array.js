/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file array utilities;
* @author leon <ludafa@outlook.com>
*/

export function range(start, stop, step = 1) {

    /* eslint-disable fecs-no-arguments */
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }

    step = step || 1;

    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const range = Array(length);

    for (let idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
    }

    return range;

}

export function compact(arr) {

    return arr.filter(function (item) {
        return !!item;
    });

}
