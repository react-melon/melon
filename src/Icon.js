/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import omit from 'lodash/omit';

const cx = create('Icon');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Icon
 *
 * @class
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
        <i
            {...omit(rest, ['states', 'variants'])}
            data-icon={icon}
            className={cx(props).build()} />
    );

}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
};

Icon.displayName = 'Icon';
