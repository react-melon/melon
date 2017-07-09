/**
 * @file TextBox/Input
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TextBoxInput');

export default class TextBoxInput extends Component {

    render() {

        const {
            multiline,
            rows,
            isFocus,
            value,
            variants,
            states,
            ...rest
        } = this.props;

        const Text = multiline ? 'textarea' : 'input';
        const className = cx()
            .addVariants(variants)
            .addStates({
                ...states,
                focus: isFocus
            })
            .build();

        const props = {
            ...rest,
            className,
            value,
            rows: multiline ? rows : null
        };

        return (
            <Text {...props} />
        );

    }


}

TextBoxInput.displayName = 'TextBoxInput';

TextBoxInput.propTypes = {
    rows: PropTypes.number
};

TextBoxInput.defaultProps = {
    rows: 2
};
