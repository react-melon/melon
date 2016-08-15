/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Icon');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Icon
 *
 * @param {Object} props     属性
 * @param {string} props.icon icon名称
 * @return {ReactElement}
 */
export default function Icon(props) {

    /* eslint-disable fecs-min-vars-per-destructure */
    const {
        icon,
        ...rest
    } = props;

    return (
        <i {...rest} data-icon={icon} className={cx(props).build()}/>
    );

}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
};

Icon.displayName = 'Icon';
