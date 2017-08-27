/**
 * @file IconButton
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';

import CenterRipple from '../ripple/CenterRipple';

const cx = create('Button');

export default function IconButton(props) {
    let {
        hasRipple,
        label,
        children,
        disabled,
        variants,
        states,
        icon,
        rippleColor,
        ...others
    } = props;

    let className = cx()
        .addVariants(variants)
        .addVariants({
            ripple: hasRipple && !disabled,
            icon: true
        })
        .addStates(states)
        .build();

    if (icon) {
        children = typeof icon === 'string'
            ? <Icon icon={icon} />
            : icon;
    }

    return (
        <button
            {...others}
            disabled={disabled}
            className={className}>
            {label || children}
            {hasRipple && !disabled ? <CenterRipple color={rippleColor} /> : null}
        </button>
    );
}

IconButton.propTypes = {
    disabled: PropTypes.bool,
    rippleColor: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.element
};

IconButton.defaultProps = {
    hasRipple: true,
    disabled: false
};
