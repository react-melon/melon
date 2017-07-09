/**
 * @file 下拉框选项组
 * @author leon <ludafa@outlook.com>
 */

import React, {Children} from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('SelectOptionGroup');

/**
 * OptionGroup
 *
 * @class
 * @param {*} props 属性
 */
export default function SelectOptionGroup(props) {

    const {
        value,
        children,
        disabled,
        label,
        onClick
    } = props;

    return (
        <div className={cx(props).build()}>
            <h4 className={cx().part('title').build()}>{label}</h4>
            <div className={cx().part('list').build()}>
                {Children.map(children, (child, index) => {

                    if (child.type !== 'option') {
                        return null;
                    }

                    return (
                        <Option
                            {...child.props}
                            key={child.props.value}
                            selected={child.props.value === value}
                            disabled={child.props.disabled || disabled}
                            onClick={onClick} />
                    );

                })}
            </div>
        </div>
    );

}

SelectOptionGroup.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired
};
