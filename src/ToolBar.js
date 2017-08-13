/**
 * @file ToolBar
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('ToolBar');

/**
 * melon/ToolBar
 *
 * @class
 * @param {Object}  props        属性
 * @return {ReactElement}
 */
export default function ToolBar(props) {

    const children = props.children;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}

ToolBar.displayName = 'ToolBar';
