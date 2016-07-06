/**
 * @file melon Tabs Tab
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TabsItem');

/* eslint-disable fecs-prefer-class */
export default function Tab(props) {

    const {
        selected,
        disabled,
        label,
        ...others
    } = props;

    const className = cx(props).addStates({selected, disabled}).build();

    return (
        <li {...others} className={className}>
            {label}
        </li>
    );
}

Tab.propTypes = {
    label: PropTypes.node,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
};

Tab.defaultProps = {
    disabled: false,
    selected: false
};
