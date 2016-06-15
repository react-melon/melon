/**
 * @file Example / TimePicker 1
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import TimePicker from 'melon/TimePicker';

require('../code/TimePicker1.txt');

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <TimePicker />
            </div>
            <div className="melon-column melon-column-6">
                <TimePicker defaultValue="08:00" />
            </div>
        </div>
    );
}

module.exports = View;
