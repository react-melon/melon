/**
 * @file CardActions
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CardActions');

export default function CardActions(props) {
    let {children, ...rest} = props;
    return (
        <div {...rest} className={cx(props).build()}>
            {children}
        </div>
    );
}
