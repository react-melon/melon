/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Title');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Title
 *
 * @class
 * @param {Object}  props       属性
 * @param {Object}  props.level 级别
 * @return {ReactElement}
 */
export default function Title(props) {

    /* eslint-disable fecs-min-vars-per-destructure */
    let {level, variants, states, ...rest} = props;

    let Type = `h${level}`;
    let className = cx(props).addVariants(variants).addStates(states).build();

    return <Type {...rest} className={className} />;

}

Title.propsTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired
};

Title.defaultProps = {
    level: 1
};
