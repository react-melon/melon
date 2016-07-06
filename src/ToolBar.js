/**
 * @file ToolBar
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('ToolBar');

export default function ToolBar(props) {

    const {children} = props;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}
