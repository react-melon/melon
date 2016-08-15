/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Title');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Title
 *
 * @param {Object}  props       属性
 * @param {Object}  props.level 级别
 * @return {ReactElement}
 */
export default function Title(props) {

    /* eslint-disable fecs-min-vars-per-destructure */
    const {level, ...rest} = props;

    return React.createElement(
        `h${level}`,
        {
            ...rest,
            className: cx(props).build()
        }
    );

}

Title.propsTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired
};

Title.defaultProps = {
    level: 1
};
