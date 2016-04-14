/**
 * @file Select/Option
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';

const cx = create('SelectOption');

export default function SelectOption(props)  {

    const {
        children,
        label,
        disabled,
        selected,
        value,
        onClick
    } = props;

    const className = cx(props)
        .addStates({
            selected,
            disabled
        })
        .build();

    return (
        <div className={className}
            key={value}
            data-value={value}
            data-role="option"
            title={label || children}
            onClick={!disabled && onClick ? () => onClick({value}) : null}>
            {label || children}
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
