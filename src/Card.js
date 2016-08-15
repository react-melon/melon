/**
 * @file Card
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Card');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Card
 *
 * @param {Object}  props           属性
 * @return {ReactElement}
 */
export default function Card(props) {

    const children = props.children;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}
/* eslint-enable fecs-prefer-class */

Card.displayName = 'Card';
