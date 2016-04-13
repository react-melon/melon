/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {create} from './common/util/cxBuilder';

const cx = create('Icon');

/* eslint-disable fecs-prefer-class */
export default function Icon(props) {

    const {
        icon,
        ...rest
    } = props;

    return (
        <i {...rest} data-icon={icon} className={cx(props).build()}/>
    );

}
/* eslint-enable fecs-prefer-class */


Icon.propTypes = {
    icon: PropTypes.string.isRequired
};

Icon.displayName = 'Icon';
