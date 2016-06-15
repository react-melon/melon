/**
 * @file Example / Slider 1
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import Slider from 'melon/Slider';

require('../code/Slider.txt');

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div>
            <Slider />
            <Slider defaultValue={28} maximum={50} minimum={10} step={2} />
        </div>
    );
}

module.exports = View;
