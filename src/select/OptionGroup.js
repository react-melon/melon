/**
 * @file 下拉框选项组
 * @author leon <ludafa@outlook.com>
 */

import React, {Children, PropTypes} from 'react';
import Option from './Option';
import {create} from '../common/util/cxBuilder';

const cx = create('SelectOptionGroup');

export default function SelectOptionGroup(props) {

    const {children, disabled, label, onClick} = props;

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
