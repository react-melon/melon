/**
 * @file Avatar
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from './Icon';

const cx = create('Avatar');

export default function Avatar(props) {
    let {icon, image, children, ...rest} = props;
    if (image) {
        return (
            <img
                {...rest}
                className={cx(props).addVariants('image').build()}
                src={image} />
        );
    }

    if (icon) {
        children = typeof icon === 'string'
            ? <Icon icon={icon} variants={['avatar']} />
            : icon;
    }

    return (
        <div
            {...rest}
            className={cx(props).build()}>
            {children}
        </div>
    );
}

Avatar.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.string
};
