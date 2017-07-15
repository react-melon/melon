/**
 * @file Select/Option
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('SelectOption');

/**
 * SelectOption
 *
 * @class
 * @param {*} props 属性
 */
export default function SelectOption(props)  {

    const {
        children,
        label,
        disabled,
        selected,
        value,
        onClick,
        style
    } = props;

    const className = cx(props)
        .addStates({
            selected,
            disabled
        })
        .build();

    return (
        <div
            className={className}
            style={style}
            data-value={value}
            data-role="option"
            title={label || children}
            onClick={!disabled && onClick ? () => onClick({value}) : null}>
            {children || label}
        </div>
    );


}


SelectOption.displayName = 'SelectOption';

SelectOption.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    label: PropTypes.string
};

SelectOption.defaultProps = {
    disabled: false,
    selected: false
};
