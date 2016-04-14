/**
 * @file TextBox/Input
 * @author leon(ludafa@outlook.com)
 */

import {Component, createElement, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';

const cx = create('TextBoxInput');

export default class TextBoxInput extends Component {

    render() {

        const props = this.props;

        const {
            multiline,
            className,
            rows,
            isFocus,
            ...rest
        } = props;

        const tag = multiline ? 'textarea' : 'input';

        return createElement(
            tag,
            {
                ...rest,
                className: cx(props)
                    .addStates({
                        focus: isFocus
                    })
                    .build(),
                rows: multiline ? rows : null
            }
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
