/**
 * @file melon/Button
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import TouchRipple from '../ripple/TouchRipple';

const cx = create('Button');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Button
 *
 * @class
 * @param {Object}  props           属性
 * @param {boolean} props.disabled  是否不可点击
 * @param {boolean} props.hasRipple 是否有ripple动画
 * @return {ReactElement}
 */
export default function Button(props) {

    const {
        hasRipple,
        label,
        children,
        disabled,
        variants,
        states,
        rippleColor,
        ...others
    } = props;

    const className = cx()
        .addVariants(variants)
        .addVariants({
            ripple: hasRipple && !disabled
        })
        .addStates(states)
        .build();

    return (
        <button
            {...others}
            disabled={disabled}
            className={className}>
            {label || children}
            {hasRipple && !disabled ? <TouchRipple color={rippleColor} /> : null}
        </button>
    );

}
/* eslint-enable fecs-prefer-class */

Button.defaultProps = {
    hasRipple: true,
    disabled: false
};

Button.propTypes = {
    hasRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    rippleColor: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.string)
};
