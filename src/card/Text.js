/**
 * @file CardText
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CardText');

export default function CardText(props) {
    let {children, ...rest} = props;
    return (
        <div {...rest} className={cx(props).build()}>
            {children}
        </div>
    );
}
