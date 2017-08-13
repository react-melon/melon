/**
 * @file melon/textbox/FloatingLabel
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TextBoxFloatingLabel');

/* eslint-disable fecs-prefer-class */
export default function TextBoxFloatingLabel(props) {

    const {
        floating,
        focused,
        label
    } = props;

    const className = cx(props)
        .addStates({
            focus: focused,
            floating
        })
        .build();

    return (
        <label className={className}>
            {label}
        </label>
    );

}

TextBoxFloatingLabel.propTypes = {
    label: PropTypes.string.isRequired,
    floating: PropTypes.bool.isRequired
};
