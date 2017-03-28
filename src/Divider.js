/**
 * @file Divider
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-prefer-class */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Divider');

/**
 * Divider
 *
 * @class
 * @param {*} props 属性
 */
export default function Divider(props) {
    return (
        <hr className={cx(props).build()} style={props.style} />
    );
}
