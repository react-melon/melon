/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Title');

/* eslint-disable fecs-prefer-class */
export default function Title(props) {

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
