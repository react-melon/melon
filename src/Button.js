/**
 * @file melon/Button
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import TouchRipple from './ripples/TouchRipple';
import omit from 'lodash/omit';

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
        ...others
    } = props;

    const className = cx(props)
        .addVariants({
            icon: React.Children.count(children) === 1
                && typeof children === 'object'
                && children.type.displayName === 'Icon',
            ripple: hasRipple && !disabled
        })
        .build();

    return (
        <button
            {...omit(others, ['variants'])}
            disabled={disabled}
            className={className}>
            {label || children}
            {hasRipple && !disabled ? <TouchRipple /> : null}
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
    disabled: PropTypes.bool
};
